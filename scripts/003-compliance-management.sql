-- Create Bonds table
CREATE TABLE IF NOT EXISTS bonds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  subcontractor_id UUID REFERENCES subcontractors(id),
  bond_type VARCHAR(100) NOT NULL,
  bond_number VARCHAR(100) UNIQUE NOT NULL,
  surety_company VARCHAR(255) NOT NULL,
  bond_amount DECIMAL(15,2) NOT NULL,
  premium_amount DECIMAL(15,2),
  effective_date DATE NOT NULL,
  expiration_date DATE NOT NULL,
  status VARCHAR(50) DEFAULT 'ACTIVE',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Insurance Policies table
CREATE TABLE IF NOT EXISTS insurance_policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  subcontractor_id UUID REFERENCES subcontractors(id),
  policy_type VARCHAR(100) NOT NULL,
  policy_number VARCHAR(100) UNIQUE NOT NULL,
  insurance_company VARCHAR(255) NOT NULL,
  coverage_amount DECIMAL(15,2) NOT NULL,
  deductible DECIMAL(15,2),
  effective_date DATE NOT NULL,
  expiration_date DATE NOT NULL,
  status VARCHAR(50) DEFAULT 'ACTIVE',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Licenses table
CREATE TABLE IF NOT EXISTS licenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subcontractor_id UUID REFERENCES subcontractors(id) ON DELETE CASCADE,
  license_type VARCHAR(100) NOT NULL,
  license_number VARCHAR(100) NOT NULL,
  issuing_authority VARCHAR(255) NOT NULL,
  issue_date DATE NOT NULL,
  expiration_date DATE NOT NULL,
  status VARCHAR(50) DEFAULT 'ACTIVE',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Certifications table
CREATE TABLE IF NOT EXISTS certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subcontractor_id UUID REFERENCES subcontractors(id) ON DELETE CASCADE,
  certification_type VARCHAR(100) NOT NULL,
  certification_number VARCHAR(100),
  issuing_organization VARCHAR(255) NOT NULL,
  issue_date DATE NOT NULL,
  expiration_date DATE,
  status VARCHAR(50) DEFAULT 'ACTIVE',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Compliance Alerts table
CREATE TABLE IF NOT EXISTS compliance_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alert_type VARCHAR(100) NOT NULL,
  reference_id UUID NOT NULL,
  reference_type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  severity VARCHAR(50) DEFAULT 'MEDIUM',
  due_date DATE,
  status VARCHAR(50) DEFAULT 'ACTIVE',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_bonds_project_id ON bonds(project_id);
CREATE INDEX IF NOT EXISTS idx_bonds_expiration_date ON bonds(expiration_date);
CREATE INDEX IF NOT EXISTS idx_insurance_policies_project_id ON insurance_policies(project_id);
CREATE INDEX IF NOT EXISTS idx_insurance_policies_expiration_date ON insurance_policies(expiration_date);
CREATE INDEX IF NOT EXISTS idx_licenses_subcontractor_id ON licenses(subcontractor_id);
CREATE INDEX IF NOT EXISTS idx_licenses_expiration_date ON licenses(expiration_date);
CREATE INDEX IF NOT EXISTS idx_certifications_subcontractor_id ON certifications(subcontractor_id);
CREATE INDEX IF NOT EXISTS idx_compliance_alerts_status ON compliance_alerts(status);
