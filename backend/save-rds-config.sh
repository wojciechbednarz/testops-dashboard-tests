#!/bin/bash
# save-rds-config.sh - Save current RDS configuration before terminating

REGION="eu-central-1"
DB_INSTANCE_ID="testops-backend-v6-db"

echo "🔍 Fetching current RDS configuration..."

# Save full RDS configuration
aws rds describe-db-instances \
  --db-instance-identifier $DB_INSTANCE_ID \
  --region $REGION \
  --query 'DBInstances[0].{
    SubnetGroup:DBSubnetGroup.DBSubnetGroupName,
    VPC:DBSubnetGroup.VpcId,
    SecurityGroups:VpcSecurityGroups[*].VpcSecurityGroupId,
    EngineVersion:EngineVersion,
    InstanceClass:DBInstanceClass,
    AllocatedStorage:AllocatedStorage,
    AvailabilityZone:AvailabilityZone,
    StorageType:StorageType,
    BackupRetention:BackupRetentionPeriod,
    Endpoint:Endpoint.Address,
    Port:Endpoint.Port
  }' \
  --output json > rds-full-config.json

echo "Configuration saved to rds-full-config.json"
echo ""
cat rds-full-config.json
echo ""
echo "Before terminating RDS:"
echo "1. Create a snapshot (optional, if you want to keep data):"
echo "   aws rds create-db-snapshot --db-instance-identifier $DB_INSTANCE_ID --db-snapshot-identifier testops-backup-\$(date +%Y%m%d) --region $REGION"
echo ""
echo "2. The configuration is saved. You can recreate RDS with:"
echo "   ./recreate-rds.sh"
