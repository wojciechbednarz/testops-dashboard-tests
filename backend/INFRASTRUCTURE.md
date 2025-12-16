# TestOps Infrastructure Recovery Guide

## Quick Reference

### Current Configuration
- **RDS Instance**: `testops-backend-v6-db`
- **Region**: `eu-central-1`
- **Subnet Group**: `testops-backend-v6-db-subnet-group`
- **Security Group**: `sg-03f93e8e54a6f8239`
- **VPC**: `vpc-09d5f900e2938b653`
- **Endpoint**: `testops-backend-v6-db.cf0gqsiu0i1o.eu-central-1.rds.amazonaws.com`

### Password Storage
Password is stored in AWS Secrets Manager: `testops-rds-password`

---

## Before Terminating Anything

### 1. Save RDS Configuration
```bash
./save-rds-config.sh
```

### 2. Create RDS Snapshot (Optional - to keep data)
```bash
aws rds create-db-snapshot \
  --db-instance-identifier testops-backend-v6-db \
  --db-snapshot-identifier testops-backup-$(date +%Y%m%d) \
  --region eu-central-1
```

### 3. Verify Secrets Manager has password
```bash
aws secretsmanager get-secret-value \
  --secret-id testops-rds-password \
  --region eu-central-1 \
  --query SecretString \
  --output text
```

---

## Recreation Steps

### If Only EB Environment is Terminated

```bash
# Simply recreate from saved config
cd backend
eb create testops-backend-v6 --cfg saved-config
```

### If Only RDS is Terminated

```bash
# Recreate RDS
./recreate-rds.sh

# Get new endpoint
NEW_ENDPOINT=$(aws rds describe-db-instances \
  --db-instance-identifier testops-backend-v6-db \
  --region eu-central-1 \
  --query 'DBInstances[0].Endpoint.Address' \
  --output text)

# Update EB environment variables
eb setenv \
  DB_HOST=$NEW_ENDPOINT \
  RDS_HOSTNAME=$NEW_ENDPOINT

# Restart application
eb deploy
```

### If Both are Terminated

```bash
# 1. Recreate RDS
./recreate-rds.sh

# 2. Get new RDS endpoint
NEW_ENDPOINT=$(aws rds describe-db-instances \
  --db-instance-identifier testops-backend-v6-db \
  --region eu-central-1 \
  --query 'DBInstances[0].Endpoint.Address' \
  --output text)

# 3. Update saved config with new endpoint
sed -i "s|DB_HOST:.*|DB_HOST: $NEW_ENDPOINT|" .elasticbeanstalk/saved_configs/saved-config.cfg.yml
sed -i "s|RDS_HOSTNAME:.*|RDS_HOSTNAME: $NEW_ENDPOINT|" .elasticbeanstalk/saved_configs/saved-config.cfg.yml

# 4. Recreate EB environment
eb create testops-backend-v6 --cfg saved-config
```

---

## Files Overview

| File | Purpose | Commit to Git? |
|------|---------|----------------|
| `recreate-rds.sh` | Script to recreate RDS instance | ✅ Yes |
| `save-rds-config.sh` | Script to backup RDS config | ✅ Yes |
| `.env.template` | Template for environment variables | ✅ Yes |
| `.env.local` | Actual environment variables | ❌ No (ignored) |
| `rds-full-config.json` | RDS configuration backup | ❌ No (ignored) |
| `saved-config.cfg.yml` | EB environment configuration | ✅ Yes |
| `01-environment.config` | EB extensions config | ✅ Yes |

---

## Security Best Practices

### Password Management
- **Use AWS Secrets Manager** (already set up)
- Never commit passwords to git
- Don't store in plain text files

### Retrieve password:
```bash
aws secretsmanager get-secret-value \
  --secret-id testops-rds-password \
  --region eu-central-1 \
  --query SecretString \
  --output text
```

### Update password:
```bash
aws secretsmanager update-secret \
  --secret-id testops-rds-password \
  --secret-string "NEW_PASSWORD" \
  --region eu-central-1
```

---

## Troubleshooting

### RDS Recreation Fails

**Check subnet group exists:**
```bash
aws rds describe-db-subnet-groups \
  --db-subnet-group-name testops-backend-v6-db-subnet-group \
  --region eu-central-1
```

**If missing, you'll need to recreate it or use default VPC subnet group**

### Can't connect to new RDS

1. Check security group allows your IP:
```bash
aws ec2 describe-security-groups \
  --group-ids sg-03f93e8e54a6f8239 \
  --region eu-central-1
```

2. Verify RDS is publicly accessible
3. Check endpoint is correct in environment variables

---

## Cost Optimization

**To save costs when not using:**
```bash
# Stop RDS (saves ~50% costs, max 7 days)
aws rds stop-db-instance \
  --db-instance-identifier testops-backend-v6-db \
  --region eu-central-1

# Terminate EB environment
eb terminate testops-backend-v6
```

**To resume:**
```bash
# Start RDS
aws rds start-db-instance \
  --db-instance-identifier testops-backend-v6-db \
  --region eu-central-1

# Recreate EB
eb create testops-backend-v6 --cfg saved-config
```
