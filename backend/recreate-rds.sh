#!/bin/bash
# recreate-rds.sh - Secure RDS recreation script with full configuration

set -e  # Exit on error

REGION="eu-central-1"
DB_INSTANCE_ID="testops-backend-v6-db"
DB_NAME="testopsbackendv6db"
DB_USERNAME="postgres"

# Network configuration (from current RDS setup)
SECURITY_GROUP_ID="sg-03f93e8e54a6f8239"
DB_SUBNET_GROUP="testops-backend-v6-db-subnet-group"

# Password options (choose one method):
# Method 1: From AWS Secrets Manager (RECOMMENDED)
DB_PASSWORD=$(aws secretsmanager get-secret-value \
  --secret-id testops-rds-password \
  --region $REGION \
  --query SecretString --output text 2>/dev/null)

# Method 2: From environment variable (fallback)
if [ -z "$DB_PASSWORD" ]; then
  DB_PASSWORD="${TESTOPS_DB_PASSWORD}"
fi

# Method 3: Prompt user (last resort)
if [ -z "$DB_PASSWORD" ]; then
  read -sp "Enter database password: " DB_PASSWORD
  echo
fi

# Validate password
if [ -z "$DB_PASSWORD" ]; then
  echo "ERROR: No password provided!"
  echo "Options:"
  echo "  1. Store in Secrets Manager: aws secretsmanager create-secret --name testops-rds-password --secret-string 'YOUR_PASSWORD' --region eu-central-1"
  echo "  2. Set environment: export TESTOPS_DB_PASSWORD='YOUR_PASSWORD'"
  echo "  3. Enter when prompted"
  exit 1
fi

echo "Creating RDS instance: $DB_INSTANCE_ID"
echo "Region: $REGION"
echo "Using Subnet Group: $DB_SUBNET_GROUP"

# Create RDS instance with all required parameters
aws rds create-db-instance \
  --db-instance-identifier $DB_INSTANCE_ID \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --engine-version 15.14 \
  --master-username $DB_USERNAME \
  --master-user-password "$DB_PASSWORD" \
  --allocated-storage 20 \
  --db-name $DB_NAME \
  --db-subnet-group-name "$DB_SUBNET_GROUP" \
  --vpc-security-group-ids $SECURITY_GROUP_ID \
  --publicly-accessible \
  --backup-retention-period 7 \
  --storage-encrypted \
  --storage-type gp3 \
  --region $REGION

echo ""
echo "RDS creation initiated"
echo "Waiting for RDS instance to be available (this takes 5-10 minutes)..."

aws rds wait db-instance-available \
  --db-instance-identifier $DB_INSTANCE_ID \
  --region $REGION

# Get the new endpoint
NEW_ENDPOINT=$(aws rds describe-db-instances \
  --db-instance-identifier $DB_INSTANCE_ID \
  --region $REGION \
  --query 'DBInstances[0].Endpoint.Address' \
  --output text)

echo ""
echo "RDS instance created successfully!"
echo "New endpoint: $NEW_ENDPOINT"
echo ""
echo "NEXT STEPS:"
echo "1. Update saved-config.cfg.yml with new endpoint:"
echo "   sed -i 's|DB_HOST:.*|DB_HOST: $NEW_ENDPOINT|' .elasticbeanstalk/saved_configs/saved-config.cfg.yml"
echo "   sed -i 's|RDS_HOSTNAME:.*|RDS_HOSTNAME: $NEW_ENDPOINT|' .elasticbeanstalk/saved_configs/saved-config.cfg.yml"
echo "2. Update 01-environment.config with new endpoint"
echo "3. Recreate EB environment:"
echo "   eb create testops-backend-v6 --cfg saved-config"
echo ""