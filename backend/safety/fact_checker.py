import re
from typing import List, Dict, Any

class FactChecker:
    def verify(self, text: str) -> Dict[str, Any]:
        """
        Scans text for specific entities (Clinical Trial IDs, Patent Numbers)
        and validates their format. In a real system, this would also check
        existence against an external database.
        """
        issues = []
        verified_facts = []

        # 1. Clinical Trial IDs (NCT + 8 digits)
        nct_pattern = r"NCT\d{8}"
        nct_matches = re.findall(nct_pattern, text)
        for nct in nct_matches:
            # Mock validation: Assume NCT00000000 is invalid
            if nct == "NCT00000000":
                issues.append(f"Invalid Clinical Trial ID detected: {nct}")
            else:
                verified_facts.append(f"Verified Clinical Trial ID: {nct}")

        # 2. Patent Numbers (US + 7-11 digits)
        patent_pattern = r"US\d{7,11}"
        patent_matches = re.findall(patent_pattern, text)
        for pat in patent_matches:
             verified_facts.append(f"Verified Patent Number: {pat}")

        return {
            "is_valid": len(issues) == 0,
            "issues": issues,
            "verified_facts": verified_facts
        }
