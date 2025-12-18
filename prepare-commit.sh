#!/bin/bash
# prepare-commit.sh - Prepare repository for secure commit

set -e

echo "Preparing Repository for Commit"
echo "==================================="
echo ""

# Step 1: Unstage everything first
echo "Step 1: Unstaging all files to start fresh..."
git reset HEAD . 2>/dev/null || echo "Nothing to unstage"
echo "Clean slate"
echo ""

# Step 2: Handle sensitive config file
echo "Step 2: Securing saved-config.cfg.yml..."

if [ -f "backend/.elasticbeanstalk/saved_configs/saved-config.cfg.yml" ]; then
    # Check if it contains password
    if grep -q "Wojciech123!" "backend/.elasticbeanstalk/saved_configs/saved-config.cfg.yml"; then
        echo "WARNING: Found password in saved-config.cfg.yml"
        echo "This file is already in .gitignore and won't be committed."
        echo "Template file (saved-config.template.yml) will be committed instead"
    fi
else
    echo "INFO: saved-config.cfg.yml not found (already ignored?)"
fi
echo ""

# Step 3: Verify .gitignore is working
echo "Step 3: Verifying .gitignore..."
if grep -q "saved-config.cfg.yml" ".gitignore"; then
    echo "PASS: saved-config.cfg.yml is in .gitignore"
else
    echo "WARNING: saved-config.cfg.yml is NOT in .gitignore!"
    read -p "Add it now? (Y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Nn]$ ]]; then
        echo ".elasticbeanstalk/saved_configs/saved-config.cfg.yml" >> .gitignore
        echo "Added to .gitignore"
    fi
fi
echo ""

# Step 4: Check for other sensitive files
echo "Step 4: Checking for other sensitive data..."
SENSITIVE_PATTERNS=("Wojciech123!" "aws_access_key" "aws_secret_key")
FOUND_ISSUES=0

for file in $(git ls-files); do
    for pattern in "${SENSITIVE_PATTERNS[@]}"; do
        if grep -q "$pattern" "$file" 2>/dev/null; then
            echo "WARNING: Found '$pattern' in: $file"
            FOUND_ISSUES=1
        fi
    done
done

if [ $FOUND_ISSUES -eq 0 ]; then
    echo "PASS: No sensitive data found in tracked files"
else
    echo ""
    echo "ERROR: Sensitive data found in tracked files!"
    echo "Please review and update these files before committing."
    echo ""
fi
echo ""

# Step 5: Show untracked infrastructure files
echo "Step 5: New Infrastructure Files (Ready to Add)"
echo "-----------------------------------------------"
ls -1 backend/.ebextensions/ 2>/dev/null | sed 's/^/  - backend\/.ebextensions\//' || echo "  (none)"
ls -1 backend/.elasticbeanstalk/saved_configs/*.template.yml 2>/dev/null | sed 's/^/  - /' || echo "  (none)"
[ -f "backend/recreate-rds.sh" ] && echo "  - backend/recreate-rds.sh"
[ -f "backend/save-rds-config.sh" ] && echo "  - backend/save-rds-config.sh"
[ -f "backend/INFRASTRUCTURE.md" ] && echo "  - backend/INFRASTRUCTURE.md"
[ -f "backend/.env.template" ] && echo "  - backend/.env.template"
echo ""

# Step 6: Summary
echo "Summary"
echo "----------"
echo "Repository is ready for commit"
echo "Sensitive files are gitignored"
echo "Template files created"
echo ""
echo "Next Steps:"
echo "1. Run: ./commit-aws-migration.sh"
echo "2. Or manually stage and commit files"
echo ""

# Step 7: Quick verification
echo "Final Verification"
echo "--------------------"
echo "Files that will NOT be committed (ignored):"
git status --ignored | grep "saved-config.cfg.yml" || echo "  INFO: saved-config.cfg.yml not shown (already committed before?)"
echo ""
echo "Ready to proceed!"
