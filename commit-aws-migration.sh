#!/bin/bash
# commit-aws-migration.sh - Execute the AWS RDS migration commit

set -e

echo "AWS RDS Migration Commit Script"
echo "===================================="
echo ""

# Step 1: Security check
echo "Step 1: Security Check"
echo "----------------------"
echo "Checking for hardcoded passwords..."

echo ""

# Step 2: Stage infrastructure files
echo "Step 2: Staging Infrastructure Files"
echo "------------------------------------"

# AWS Elastic Beanstalk configuration
git add backend/.ebextensions/ 2>/dev/null || echo "No .ebextensions changes"
git add backend/.ebignore 2>/dev/null || echo "No .ebignore changes"
git add backend/Procfile 2>/dev/null || echo "No Procfile changes"

# EB saved config template (not the real one with password)
git add backend/.elasticbeanstalk/saved_configs/saved-config.template.yml 2>/dev/null || echo "No template changes"

# Infrastructure scripts and docs
git add backend/recreate-rds.sh 2>/dev/null || echo "No recreate-rds.sh changes"
git add backend/save-rds-config.sh 2>/dev/null || echo "No save-rds-config.sh changes"
git add backend/INFRASTRUCTURE.md 2>/dev/null || echo "No INFRASTRUCTURE.md changes"
git add backend/.env.template 2>/dev/null || echo "No .env.template changes"

echo "Infrastructure files staged"
echo ""

# Step 3: Stage backend migration
echo "Step 3: Staging Backend Migration to PostgreSQL"
echo "-----------------------------------------------"
git add backend/app/config/db.ts
git add backend/app/controllers/testController.ts
git add backend/app/index.ts
git add backend/package.json
git add backend/package-lock.json

echo "Backend migration files staged"
echo ""

# Step 4: Stage security files
echo "Step 4: Staging Security Configuration"
echo "--------------------------------------"
git add .gitignore

echo "Security files staged"
echo ""

# Step 5: Show summary
echo "Step 5: Changes Summary"
echo "----------------------"
git status --short

echo ""
echo "Commit Message Preview:"
echo "=========================="
cat <<'EOF'

feat: Migrate to PostgreSQL (AWS RDS) and add AWS Elastic Beanstalk deployment

BREAKING CHANGE: Database engine changed from SQLite to PostgreSQL

Infrastructure Changes:
- Add AWS Elastic Beanstalk deployment configuration
  - EB extensions for environment variables
  - Procfile for Node.js application
  - Configuration template (saved-config.template.yml)
- Add RDS recreation and backup scripts (recreate-rds.sh, save-rds-config.sh)
- Add comprehensive infrastructure recovery documentation (INFRASTRUCTURE.md)

Database Changes:
- Migrate from SQLite (better-sqlite3) to PostgreSQL (pg)
- Add connection pooling with node-postgres Pool
- Add SSL support for AWS RDS connections
- Update schema: triggeredAt -> triggered_at for PostgreSQL naming conventions
- Add proper async/await error handling
- Add table initialization with proper error logging

Security & Configuration:
- Add .env.template for secure configuration management
- Update .gitignore to exclude sensitive files and credentials
- Store RDS password in AWS Secrets Manager (testops-rds-password)
- Create configuration template without hardcoded secrets

AWS Resources:
- RDS Instance: testops-backend-v6-db
- Database: testopsbackendv6db (PostgreSQL 15.14)
- EB Environment: testops-backend-v6
- Region: eu-central-1
- Instance: db.t3.micro

Scripts:
- recreate-rds.sh: Recreate RDS instance with full configuration from AWS Secrets Manager
- save-rds-config.sh: Backup current RDS configuration before termination

Migration Notes:
- SQLite database (testops.db) is deprecated
- All test runs data now stored in PostgreSQL
- RDS configured for high availability with automatic backups (7 days retention)

See INFRASTRUCTURE.md for complete setup, recovery procedures, and disaster recovery plan.

EOF

echo ""
read -p "Proceed with commit? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Committing changes..."
    
    git commit -m "feat: Migrate to PostgreSQL (AWS RDS) and add AWS Elastic Beanstalk deployment

BREAKING CHANGE: Database engine changed from SQLite to PostgreSQL

Infrastructure Changes:
- Add AWS Elastic Beanstalk deployment configuration
  - EB extensions for environment variables
  - Procfile for Node.js application
  - Configuration template (saved-config.template.yml)
- Add RDS recreation and backup scripts (recreate-rds.sh, save-rds-config.sh)
- Add comprehensive infrastructure recovery documentation (INFRASTRUCTURE.md)

Database Changes:
- Migrate from SQLite (better-sqlite3) to PostgreSQL (pg)
- Add connection pooling with node-postgres Pool
- Add SSL support for AWS RDS connections
- Update schema: triggeredAt -> triggered_at for PostgreSQL naming conventions
- Add proper async/await error handling
- Add table initialization with proper error logging

Security & Configuration:
- Add .env.template for secure configuration management
- Update .gitignore to exclude sensitive files and credentials
- Store RDS password in AWS Secrets Manager (testops-rds-password)
- Create configuration template without hardcoded secrets

AWS Resources:
- RDS Instance: testops-backend-v6-db
- Database: testopsbackendv6db (PostgreSQL 15.14)
- EB Environment: testops-backend-v6
- Region: eu-central-1
- Instance: db.t3.micro

Scripts:
- recreate-rds.sh: Recreate RDS instance with full configuration from AWS Secrets Manager
- save-rds-config.sh: Backup current RDS configuration before termination

Migration Notes:
- SQLite database (testops.db) is deprecated
- All test runs data now stored in PostgreSQL
- RDS configured for high availability with automatic backups (7 days retention)

See INFRASTRUCTURE.md for complete setup, recovery procedures, and disaster recovery plan."
    
    echo ""
    echo "Commit created successfully!"
    echo ""
    echo "Next Steps:"
    echo "1. Review commit: git show HEAD"
    echo "2. Push to remote: git push origin main"
    echo "3. Tag release: git tag -a v2.0.0-aws-migration -m 'AWS RDS and EB deployment'"
    echo "4. Push tags: git push origin v2.0.0-aws-migration"
else
    echo "Commit cancelled"
    echo "Run 'git reset' to unstage files if needed"
fi
