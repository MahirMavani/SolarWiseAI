/**
 * SolarWise AI — India-Wide State Subsidy Engine (2026)
 * Single Source of Truth for Central PM Surya Ghar CFA & State/UT Renewable Incentives
 * Authoritative, Deterministic Calculations
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    // Node.js CommonJS
    module.exports = factory();
  } else {
    // Browser global
    root.SolarSubsidyData = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

  // Authoritative State & UT Subsidy Dataset (All 28 States & 8 Union Territories)
  const JURISDICTIONS_DATA = [
    {
      jurisdiction: "Andaman and Nicobar Islands",
      category: "Special",
      central_cfa_1kw: 36000,
      central_cfa_2kw: 72000,
      central_cfa_3kw: 85800,
      state_incentive_type: "none",
      state_incentive_1kw: 0,
      state_incentive_2kw: 0,
      state_incentive_3kw: 0,
      state_incentive: "Central CFA only; island grid solarization program",
      total_3kw: 85800,
      notes: "Special category island UT receiving enhanced central CFA under PM Surya Ghar. No additional UT cash capex subsidy verified.",
      source_or_verification_note: "MNRE PM Surya Ghar National Portal & Electricity Department A&N",
      verification_status: "Central CFA only verified"
    },
    {
      jurisdiction: "Andhra Pradesh",
      category: "General",
      central_cfa_1kw: 33000,
      central_cfa_2kw: 66000,
      central_cfa_3kw: 78000,
      state_incentive_type: "none",
      state_incentive_1kw: 0,
      state_incentive_2kw: 0,
      state_incentive_3kw: 0,
      state_incentive: "Central CFA only; DISCOM net-metering settlement",
      total_3kw: 78000,
      notes: "Central PM Surya Ghar CFA fully operational across APEPDCL and APSPDCL. No additional state-level capex subsidy was verified in the current SolarWise database.",
      source_or_verification_note: "MNRE / APSEEDCO / APERC Net Metering Regulations",
      verification_status: "Central CFA only verified"
    },
    {
      jurisdiction: "Arunachal Pradesh",
      category: "Special",
      central_cfa_1kw: 36000,
      central_cfa_2kw: 72000,
      central_cfa_3kw: 85800,
      state_incentive_type: "none",
      state_incentive_1kw: 0,
      state_incentive_2kw: 0,
      state_incentive_3kw: 0,
      state_incentive: "Central CFA only; Special Category NE incentive",
      total_3kw: 85800,
      notes: "Special Category North-Eastern State receiving enhanced central CFA under PM Surya Ghar. No additional state capex top-up confirmed.",
      source_or_verification_note: "MNRE & Department of Power, Govt of Arunachal Pradesh",
      verification_status: "Central CFA only verified"
    },
    {
      jurisdiction: "Assam",
      category: "Special",
      central_cfa_1kw: 36000,
      central_cfa_2kw: 72000,
      central_cfa_3kw: 85800,
      state_incentive_type: "per_kw_capped",
      state_incentive_1kw: 15000,
      state_incentive_2kw: 30000,
      state_incentive_3kw: 45000,
      state_incentive: "State top-up scheme announced by APDCL for residential consumers",
      total_3kw: 130800,
      notes: "Assam state government and APDCL announced state top-up for residential consumers under the state solar mission. Disbursement requires validation with the latest DISCOM circular.",
      source_or_verification_note: "APDCL / Assam Energy Development Agency (AEDA)",
      verification_status: "Official existence; amount needs current order"
    },
    {
      jurisdiction: "Bihar",
      category: "General",
      central_cfa_1kw: 33000,
      central_cfa_2kw: 66000,
      central_cfa_3kw: 78000,
      state_incentive_type: "none",
      state_incentive_1kw: 0,
      state_incentive_2kw: 0,
      state_incentive_3kw: 0,
      state_incentive: "Central CFA only; BREDA net metering",
      total_3kw: 78000,
      notes: "Central PM Surya Ghar CFA operational through NBPDCL and SBPDCL. No additional state capex subsidy was verified in the current SolarWise database.",
      source_or_verification_note: "MNRE / BREDA / Bihar State Power Holding Company",
      verification_status: "Central CFA only verified"
    },
    {
      jurisdiction: "Chandigarh",
      category: "General",
      central_cfa_1kw: 33000,
      central_cfa_2kw: 66000,
      central_cfa_3kw: 78000,
      state_incentive_type: "none",
      state_incentive_1kw: 0,
      state_incentive_2kw: 0,
      state_incentive_3kw: 0,
      state_incentive: "Central CFA only; mandatory rooftop solar compliance",
      total_3kw: 78000,
      notes: "Chandigarh Renewable Energy and Science & Technology Promotion Society (CREST) enforces mandatory rooftop solar for plots 500 sq.yd+. Central CFA applies.",
      source_or_verification_note: "CREST Chandigarh / MNRE National Portal",
      verification_status: "Central CFA only verified"
    },
    {
      jurisdiction: "Chhattisgarh",
      category: "General",
      central_cfa_1kw: 33000,
      central_cfa_2kw: 66000,
      central_cfa_3kw: 78000,
      state_incentive_type: "none",
      state_incentive_1kw: 0,
      state_incentive_2kw: 0,
      state_incentive_3kw: 0,
      state_incentive: "Central CFA only; CREDA net-billing",
      total_3kw: 78000,
      notes: "Central PM Surya Ghar CFA supported via CSPDCL and CREDA. No additional state-level direct cash capex subsidy was verified in the current SolarWise database.",
      source_or_verification_note: "CREDA Chhattisgarh / CSPDCL",
      verification_status: "Central CFA only verified"
    },
    {
      jurisdiction: "Dadra and Nagar Haveli and Daman and Diu",
      category: "General",
      central_cfa_1kw: 33000,
      central_cfa_2kw: 66000,
      central_cfa_3kw: 78000,
      state_incentive_type: "none",
      state_incentive_1kw: 0,
      state_incentive_2kw: 0,
      state_incentive_3kw: 0,
      state_incentive: "Central CFA only; DNH Power Distribution net metering",
      total_3kw: 78000,
      notes: "Integrated UT under DNH-DD Power Distribution Corporation. PM Surya Ghar central CFA is directly credited.",
      source_or_verification_note: "MNRE National Portal & DNH-DD Power Distribution",
      verification_status: "Central CFA only verified"
    },
    {
      jurisdiction: "Delhi",
      category: "General",
      central_cfa_1kw: 33000,
      central_cfa_2kw: 66000,
      central_cfa_3kw: 78000,
      state_incentive_type: "per_kw_capped",
      state_incentive_1kw: 2000,
      state_incentive_2kw: 4000,
      state_incentive_3kw: 6000,
      state_incentive: "₹2,000/kW state capex subsidy (max ₹10,000) + GBI ₹2-3/kWh",
      total_3kw: 84000,
      notes: "Delhi Solar Policy 2024 provides ₹2,000 per kW state top-up (capped at ₹10,000 for 5 kW), plus Generation Based Incentive (GBI) up to ₹3/kWh for 5 years via BRPL, BYPL, TPDDL.",
      source_or_verification_note: "Delhi Solar Policy 2024 / DERC / Energy Dept GNCTD",
      verification_status: "Official/currently verified"
    },
    {
      jurisdiction: "Goa",
      category: "General",
      central_cfa_1kw: 33000,
      central_cfa_2kw: 66000,
      central_cfa_3kw: 78000,
      state_incentive_type: "provisional",
      state_incentive_1kw: 0,
      state_incentive_2kw: 0,
      state_incentive_3kw: 0,
      state_incentive: "Central CFA only; state solar policy draft under review",
      total_3kw: 78000,
      notes: "Goa Energy Development Agency (GEDA) coordinates PM Surya Ghar rollout. State incentive scheme notifications are pending final budgetary sanction.",
      source_or_verification_note: "Goa Energy Development Agency (GEDA)",
      verification_status: "Central CFA only verified"
    },
    {
      jurisdiction: "Gujarat",
      category: "General",
      central_cfa_1kw: 33000,
      central_cfa_2kw: 66000,
      central_cfa_3kw: 78000,
      state_incentive_type: "none",
      state_incentive_1kw: 0,
      state_incentive_2kw: 0,
      state_incentive_3kw: 0,
      state_incentive: "Central CFA only; net metering credits via DISCOM",
      total_3kw: 78000,
      notes: "PM Surya Ghar national portal is fully operational across DGVCL, MGVCL, PGVCL, UGVCL, Torrent Power. No additional state-level capex subsidy was verified in the current SolarWise database.",
      source_or_verification_note: "MNRE / GUVNL National Portal",
      verification_status: "Central CFA only verified"
    },
    {
      jurisdiction: "Haryana",
      category: "General",
      central_cfa_1kw: 33000,
      central_cfa_2kw: 66000,
      central_cfa_3kw: 78000,
      state_incentive_type: "none",
      state_incentive_1kw: 0,
      state_incentive_2kw: 0,
      state_incentive_3kw: 0,
      state_incentive: "Central CFA only; HAREDA net metering",
      total_3kw: 78000,
      notes: "HAREDA enforces rooftop solar mandates for institutional and large residential buildings. DHBVN/UHBVN administer central CFA through the National Portal.",
      source_or_verification_note: "HAREDA / DHBVN / UHBVN",
      verification_status: "Central CFA only verified"
    },
    {
      jurisdiction: "Himachal Pradesh",
      category: "Special",
      central_cfa_1kw: 36000,
      central_cfa_2kw: 72000,
      central_cfa_3kw: 85800,
      state_incentive_type: "none",
      state_incentive_1kw: 0,
      state_incentive_2kw: 0,
      state_incentive_3kw: 0,
      state_incentive: "Central CFA only; Special Category Hill State CFA",
      total_3kw: 85800,
      notes: "Special category hill state receiving enhanced central CFA under PM Surya Ghar guidelines. Administered via HIMURJA and HPSEBL.",
      source_or_verification_note: "MNRE / HIMURJA / HPSEBL",
      verification_status: "Central CFA only verified"
    },
    {
      jurisdiction: "Jammu and Kashmir",
      category: "Special",
      central_cfa_1kw: 36000,
      central_cfa_2kw: 72000,
      central_cfa_3kw: 85800,
      state_incentive_type: "none",
      state_incentive_1kw: 0,
      state_incentive_2kw: 0,
      state_incentive_3kw: 0,
      state_incentive: "Central CFA only; Special Category UT CFA",
      total_3kw: 85800,
      notes: "Special category UT receiving enhanced central CFA under PM Surya Ghar. JAKEDA facilitates implementation across JPDCL and KPDCL.",
      source_or_verification_note: "JAKEDA / JPDCL / KPDCL / MNRE",
      verification_status: "Central CFA only verified"
    },
    {
      jurisdiction: "Jharkhand",
      category: "General",
      central_cfa_1kw: 33000,
      central_cfa_2kw: 66000,
      central_cfa_3kw: 78000,
      state_incentive_type: "none",
      state_incentive_1kw: 0,
      state_incentive_2kw: 0,
      state_incentive_3kw: 0,
      state_incentive: "Central CFA only; JREDA solar policy",
      total_3kw: 78000,
      notes: "PM Surya Ghar central CFA active via JBVNL. No additional state-level capex subsidy was verified in the current SolarWise database.",
      source_or_verification_note: "JREDA / JBVNL / MNRE",
      verification_status: "Central CFA only verified"
    },
    {
      jurisdiction: "Karnataka",
      category: "General",
      central_cfa_1kw: 33000,
      central_cfa_2kw: 66000,
      central_cfa_3kw: 78000,
      state_incentive_type: "none",
      state_incentive_1kw: 0,
      state_incentive_2kw: 0,
      state_incentive_3kw: 0,
      state_incentive: "Central CFA only; KREDL & BESCOM net metering",
      total_3kw: 78000,
      notes: "PM Surya Ghar central CFA operational across BESCOM, MESCOM, HESCOM, GESCOM, CESC. No additional state-level cash capex subsidy was verified in the current SolarWise database.",
      source_or_verification_note: "KREDL / BESCOM / KERC Net Metering Orders",
      verification_status: "Central CFA only verified"
    },
    {
      jurisdiction: "Kerala",
      category: "General",
      central_cfa_1kw: 33000,
      central_cfa_2kw: 66000,
      central_cfa_3kw: 78000,
      state_incentive_type: "none",
      state_incentive_1kw: 0,
      state_incentive_2kw: 0,
      state_incentive_3kw: 0,
      state_incentive: "Central CFA only; KSEB Soura scheme integration",
      total_3kw: 78000,
      notes: "KSEBL coordinates PM Surya Ghar via the Soura portal. Central CFA applies directly. No additional state direct cash capex subsidy was verified in the current SolarWise database.",
      source_or_verification_note: "ANERT / KSEBL Soura Portal",
      verification_status: "Central CFA only verified"
    },
    {
      jurisdiction: "Ladakh",
      category: "Special",
      central_cfa_1kw: 36000,
      central_cfa_2kw: 72000,
      central_cfa_3kw: 85800,
      state_incentive_type: "none",
      state_incentive_1kw: 0,
      state_incentive_2kw: 0,
      state_incentive_3kw: 0,
      state_incentive: "Central CFA only; Special Category UT CFA",
      total_3kw: 85800,
      notes: "Special category Union Territory receiving enhanced central CFA under PM Surya Ghar guidelines. Administered by Ladakh Renewable Energy Development Agency (LREDA).",
      source_or_verification_note: "MNRE / LREDA / UT Administration of Ladakh",
      verification_status: "Central CFA only verified"
    },
    {
      jurisdiction: "Lakshadweep",
      category: "Special",
      central_cfa_1kw: 36000,
      central_cfa_2kw: 72000,
      central_cfa_3kw: 85800,
      state_incentive_type: "none",
      state_incentive_1kw: 0,
      state_incentive_2kw: 0,
      state_incentive_3kw: 0,
      state_incentive: "Central CFA only; Island territory special category",
      total_3kw: 85800,
      notes: "Special category island UT receiving enhanced central CFA under PM Surya Ghar. No separate UT capex top-up confirmed.",
      source_or_verification_note: "MNRE / Electricity Department Lakshadweep",
      verification_status: "Central CFA only verified"
    },
    {
      jurisdiction: "Madhya Pradesh",
      category: "General",
      central_cfa_1kw: 33000,
      central_cfa_2kw: 66000,
      central_cfa_3kw: 78000,
      state_incentive_type: "none",
      state_incentive_1kw: 0,
      state_incentive_2kw: 0,
      state_incentive_3kw: 0,
      state_incentive: "Central CFA only; MPUVN net metering",
      total_3kw: 78000,
      notes: "Central PM Surya Ghar CFA is operational across MPPKVVCL (Indore/Jabalpur) and MPMKVVCL (Bhopal). No additional state-level capex subsidy was verified in the current SolarWise database.",
      source_or_verification_note: "MPUVN / MP Discoms / MPERC",
      verification_status: "Central CFA only verified"
    },
    {
      jurisdiction: "Maharashtra",
      category: "General",
      central_cfa_1kw: 33000,
      central_cfa_2kw: 66000,
      central_cfa_3kw: 78000,
      state_incentive_type: "none",
      state_incentive_1kw: 0,
      state_incentive_2kw: 0,
      state_incentive_3kw: 0,
      state_incentive: "Central CFA only; MSEDCL net metering settlement",
      total_3kw: 78000,
      notes: "PM Surya Ghar national portal fully operational across MSEDCL, Adani Electricity, Tata Power, BEST. No additional state-level cash capex subsidy was verified in the current SolarWise database.",
      source_or_verification_note: "MEDA / MSEDCL / MERC Net Metering Regulations",
      verification_status: "Central CFA only verified"
    },
    {
      jurisdiction: "Manipur",
      category: "Special",
      central_cfa_1kw: 36000,
      central_cfa_2kw: 72000,
      central_cfa_3kw: 85800,
      state_incentive_type: "none",
      state_incentive_1kw: 0,
      state_incentive_2kw: 0,
      state_incentive_3kw: 0,
      state_incentive: "Central CFA only; Special Category NE incentive",
      total_3kw: 85800,
      notes: "Special category North-Eastern state receiving enhanced central CFA under PM Surya Ghar. Administered via MANIREDA and MSPDCL.",
      source_or_verification_note: "MANIREDA / MSPDCL / MNRE",
      verification_status: "Central CFA only verified"
    },
    {
      jurisdiction: "Meghalaya",
      category: "Special",
      central_cfa_1kw: 36000,
      central_cfa_2kw: 72000,
      central_cfa_3kw: 85800,
      state_incentive_type: "none",
      state_incentive_1kw: 0,
      state_incentive_2kw: 0,
      state_incentive_3kw: 0,
      state_incentive: "Central CFA only; Special Category NE incentive",
      total_3kw: 85800,
      notes: "Special category North-Eastern state receiving enhanced central CFA under PM Surya Ghar. Implemented via MNREDA and MePDCL.",
      source_or_verification_note: "MNREDA / MePDCL / MNRE",
      verification_status: "Central CFA only verified"
    },
    {
      jurisdiction: "Mizoram",
      category: "Special",
      central_cfa_1kw: 36000,
      central_cfa_2kw: 72000,
      central_cfa_3kw: 85800,
      state_incentive_type: "none",
      state_incentive_1kw: 0,
      state_incentive_2kw: 0,
      state_incentive_3kw: 0,
      state_incentive: "Central CFA only; Special Category NE incentive",
      total_3kw: 85800,
      notes: "Special category North-Eastern state receiving enhanced central CFA under PM Surya Ghar. Administered via ZEDA and Power & Electricity Dept Mizoram.",
      source_or_verification_note: "ZEDA / P&E Dept Mizoram / MNRE",
      verification_status: "Central CFA only verified"
    },
    {
      jurisdiction: "Nagaland",
      category: "Special",
      central_cfa_1kw: 36000,
      central_cfa_2kw: 72000,
      central_cfa_3kw: 85800,
      state_incentive_type: "none",
      state_incentive_1kw: 0,
      state_incentive_2kw: 0,
      state_incentive_3kw: 0,
      state_incentive: "Central CFA only; Special Category NE incentive",
      total_3kw: 85800,
      notes: "Special category North-Eastern state receiving enhanced central CFA under PM Surya Ghar. Implemented via Department of New & Renewable Energy Nagaland.",
      source_or_verification_note: "DNRE Nagaland / MNRE",
      verification_status: "Central CFA only verified"
    },
    {
      jurisdiction: "Odisha",
      category: "General",
      central_cfa_1kw: 33000,
      central_cfa_2kw: 66000,
      central_cfa_3kw: 78000,
      state_incentive_type: "none",
      state_incentive_1kw: 0,
      state_incentive_2kw: 0,
      state_incentive_3kw: 0,
      state_incentive: "Central CFA only; OREDA net metering framework",
      total_3kw: 78000,
      notes: "Central PM Surya Ghar CFA is operational across TPCODL, TPNODL, TPSODL, and TPWODL. No additional state-level capex subsidy was verified in the current SolarWise database.",
      source_or_verification_note: "OREDA / Tata Power Odisha Discoms / OERC",
      verification_status: "Central CFA only verified"
    },
    {
      jurisdiction: "Puducherry",
      category: "General",
      central_cfa_1kw: 33000,
      central_cfa_2kw: 66000,
      central_cfa_3kw: 78000,
      state_incentive_type: "none",
      state_incentive_1kw: 0,
      state_incentive_2kw: 0,
      state_incentive_3kw: 0,
      state_incentive: "Central CFA only; Electricity Department Puducherry net metering",
      total_3kw: 78000,
      notes: "Electricity Department of Puducherry participates in PM Surya Ghar. No additional UT-level capex subsidy was verified in the current SolarWise database.",
      source_or_verification_note: "Electricity Department Puducherry / MNRE",
      verification_status: "Central CFA only verified"
    },
    {
      jurisdiction: "Punjab",
      category: "General",
      central_cfa_1kw: 33000,
      central_cfa_2kw: 66000,
      central_cfa_3kw: 78000,
      state_incentive_type: "none",
      state_incentive_1kw: 0,
      state_incentive_2kw: 0,
      state_incentive_3kw: 0,
      state_incentive: "Central CFA only; PSPCL net-metering settlement",
      total_3kw: 78000,
      notes: "PEDA and PSPCL process PM Surya Ghar national portal applications. No additional state capex subsidy was verified in the current SolarWise database.",
      source_or_verification_note: "PEDA / PSPCL / PSERC",
      verification_status: "Central CFA only verified"
    },
    {
      jurisdiction: "Rajasthan",
      category: "General",
      central_cfa_1kw: 33000,
      central_cfa_2kw: 66000,
      central_cfa_3kw: 78000,
      state_incentive_type: "none",
      state_incentive_1kw: 0,
      state_incentive_2kw: 0,
      state_incentive_3kw: 0,
      state_incentive: "Central CFA only; RRECL net-metering regulations",
      total_3kw: 78000,
      notes: "PM Surya Ghar national portal is operational across JVVNL, AVVNL, and JdVVNL. No additional state-level capex subsidy was verified in the current SolarWise database.",
      source_or_verification_note: "RRECL / Rajasthan Discoms / RERC",
      verification_status: "Central CFA only verified"
    },
    {
      jurisdiction: "Sikkim",
      category: "Special",
      central_cfa_1kw: 36000,
      central_cfa_2kw: 72000,
      central_cfa_3kw: 85800,
      state_incentive_type: "none",
      state_incentive_1kw: 0,
      state_incentive_2kw: 0,
      state_incentive_3kw: 0,
      state_incentive: "Central CFA only; Special Category NE incentive",
      total_3kw: 85800,
      notes: "Special category North-Eastern state receiving enhanced central CFA under PM Surya Ghar. Implemented via SREDA and Power Dept Sikkim.",
      source_or_verification_note: "SREDA / Power Dept Sikkim / MNRE",
      verification_status: "Central CFA only verified"
    },
    {
      jurisdiction: "Tamil Nadu",
      category: "General",
      central_cfa_1kw: 33000,
      central_cfa_2kw: 66000,
      central_cfa_3kw: 78000,
      state_incentive_type: "none",
      state_incentive_1kw: 0,
      state_incentive_2kw: 0,
      state_incentive_3kw: 0,
      state_incentive: "Central CFA only; TANGEDCO net feed-in billing",
      total_3kw: 78000,
      notes: "TEDA and TANGEDCO administer PM Surya Ghar national portal applications. No additional state-level capex subsidy was verified in the current SolarWise database.",
      source_or_verification_note: "TEDA / TANGEDCO / TNERC",
      verification_status: "Central CFA only verified"
    },
    {
      jurisdiction: "Telangana",
      category: "General",
      central_cfa_1kw: 33000,
      central_cfa_2kw: 66000,
      central_cfa_3kw: 78000,
      state_incentive_type: "none",
      state_incentive_1kw: 0,
      state_incentive_2kw: 0,
      state_incentive_3kw: 0,
      state_incentive: "Central CFA only; TGSPDCL & TGNPDCL net metering",
      total_3kw: 78000,
      notes: "TGREDCO, TGSPDCL, and TGNPDCL facilitate PM Surya Ghar. No additional state cash capex subsidy was verified in the current SolarWise database.",
      source_or_verification_note: "TGREDCO / TGSPDCL / TSERC",
      verification_status: "Central CFA only verified"
    },
    {
      jurisdiction: "Tripura",
      category: "Special",
      central_cfa_1kw: 36000,
      central_cfa_2kw: 72000,
      central_cfa_3kw: 85800,
      state_incentive_type: "none",
      state_incentive_1kw: 0,
      state_incentive_2kw: 0,
      state_incentive_3kw: 0,
      state_incentive: "Central CFA only; Special Category NE incentive",
      total_3kw: 85800,
      notes: "Special category North-Eastern state receiving enhanced central CFA under PM Surya Ghar. TREDA and TSECL coordinate deployment.",
      source_or_verification_note: "TREDA / TSECL / MNRE",
      verification_status: "Central CFA only verified"
    },
    {
      jurisdiction: "Uttar Pradesh",
      category: "General",
      central_cfa_1kw: 33000,
      central_cfa_2kw: 66000,
      central_cfa_3kw: 78000,
      state_incentive_type: "per_kw_capped",
      state_incentive_1kw: 15000,
      state_incentive_2kw: 30000,
      state_incentive_3kw: 30000,
      state_incentive: "₹15,000/kW state top-up capped at ₹30,000 max",
      total_3kw: 108000,
      notes: "Uttar Pradesh New and Renewable Energy Development Agency (UPNEDA) provides an official state top-up of ₹15,000 per kW, up to a maximum of ₹30,000 for residential systems.",
      source_or_verification_note: "UPNEDA Solar Policy / PM Surya Ghar UP Portal / UPERC",
      verification_status: "Official/currently verified"
    },
    {
      jurisdiction: "Uttarakhand",
      category: "Special",
      central_cfa_1kw: 36000,
      central_cfa_2kw: 72000,
      central_cfa_3kw: 85800,
      state_incentive_type: "none",
      state_incentive_1kw: 0,
      state_incentive_2kw: 0,
      state_incentive_3kw: 0,
      state_incentive: "Central CFA only; Special Category Hill State CFA",
      total_3kw: 85800,
      notes: "Special category hill state receiving enhanced central CFA under PM Surya Ghar. Administered via UREDA and UPCL.",
      source_or_verification_note: "UREDA / UPCL / UERC",
      verification_status: "Central CFA only verified"
    },
    {
      jurisdiction: "West Bengal",
      category: "General",
      central_cfa_1kw: 33000,
      central_cfa_2kw: 66000,
      central_cfa_3kw: 78000,
      state_incentive_type: "none",
      state_incentive_1kw: 0,
      state_incentive_2kw: 0,
      state_incentive_3kw: 0,
      state_incentive: "Central CFA only; WBSEDCL & CESC net metering",
      total_3kw: 78000,
      notes: "PM Surya Ghar central CFA is operational across WBSEDCL and CESC Kolkata. No additional state-level capex subsidy was verified in the current SolarWise database.",
      source_or_verification_note: "WBREDA / WBSEDCL / CESC / WBERC",
      verification_status: "Central CFA only verified"
    }
  ];

  // Comprehensive City-to-State Normalization Dictionary
  const CITY_TO_STATE_MAP = {
    // Gujarat
    'surat': 'Gujarat',
    'ahmedabad': 'Gujarat',
    'vadodara': 'Gujarat',
    'baroda': 'Gujarat',
    'rajkot': 'Gujarat',
    'bhavnagar': 'Gujarat',
    'jamnagar': 'Gujarat',
    'gandhinagar': 'Gujarat',
    'junagadh': 'Gujarat',
    'anand': 'Gujarat',
    'navsari': 'Gujarat',
    'morbi': 'Gujarat',
    'bharuch': 'Gujarat',

    // Rajasthan
    'jaipur': 'Rajasthan',
    'jodhpur': 'Rajasthan',
    'udaipur': 'Rajasthan',
    'kota': 'Rajasthan',
    'bikaner': 'Rajasthan',
    'ajmer': 'Rajasthan',
    'bhilwara': 'Rajasthan',
    'alwar': 'Rajasthan',
    'sikar': 'Rajasthan',

    // Karnataka
    'bengaluru': 'Karnataka',
    'bangalore': 'Karnataka',
    'mysuru': 'Karnataka',
    'mysore': 'Karnataka',
    'hubli': 'Karnataka',
    'hubballi': 'Karnataka',
    'dharwad': 'Karnataka',
    'mangalore': 'Karnataka',
    'mangaluru': 'Karnataka',
    'belgaum': 'Karnataka',
    'belagavi': 'Karnataka',
    'gulbarga': 'Karnataka',
    'kalaburagi': 'Karnataka',
    'davangere': 'Karnataka',
    'bellary': 'Karnataka',
    'ballari': 'Karnataka',
    'shimoga': 'Karnataka',
    'shivamogga': 'Karnataka',

    // Maharashtra
    'mumbai': 'Maharashtra',
    'bombay': 'Maharashtra',
    'pune': 'Maharashtra',
    'nagpur': 'Maharashtra',
    'nashik': 'Maharashtra',
    'nasik': 'Maharashtra',
    'thane': 'Maharashtra',
    'aurangabad': 'Maharashtra',
    'chhatrapati sambhajinagar': 'Maharashtra',
    'solapur': 'Maharashtra',
    'navi mumbai': 'Maharashtra',
    'amravati': 'Maharashtra',
    'kolhapur': 'Maharashtra',
    'akola': 'Maharashtra',
    'jalgaon': 'Maharashtra',

    // Delhi
    'delhi': 'Delhi',
    'new delhi': 'Delhi',
    'delhi ncr': 'Delhi',
    'nct': 'Delhi',

    // Uttar Pradesh
    'lucknow': 'Uttar Pradesh',
    'kanpur': 'Uttar Pradesh',
    'varanasi': 'Uttar Pradesh',
    'banaras': 'Uttar Pradesh',
    'kashi': 'Uttar Pradesh',
    'agra': 'Uttar Pradesh',
    'prayagraj': 'Uttar Pradesh',
    'allahabad': 'Uttar Pradesh',
    'noida': 'Uttar Pradesh',
    'greater noida': 'Uttar Pradesh',
    'ghaziabad': 'Uttar Pradesh',
    'meerut': 'Uttar Pradesh',
    'bareilly': 'Uttar Pradesh',
    'aligarh': 'Uttar Pradesh',
    'moradabad': 'Uttar Pradesh',
    'gorakhpur': 'Uttar Pradesh',
    'ayodhya': 'Uttar Pradesh',
    'faizabad': 'Uttar Pradesh',
    'jhansi': 'Uttar Pradesh',
    'mathura': 'Uttar Pradesh',

    // Bihar
    'patna': 'Bihar',
    'gaya': 'Bihar',
    'bhagalpur': 'Bihar',
    'muzaffarpur': 'Bihar',
    'purnia': 'Bihar',
    'darbhanga': 'Bihar',
    'bihar sharif': 'Bihar',
    'arrah': 'Bihar',
    'begusarai': 'Bihar',

    // Tamil Nadu
    'chennai': 'Tamil Nadu',
    'madras': 'Tamil Nadu',
    'coimbatore': 'Tamil Nadu',
    'madurai': 'Tamil Nadu',
    'tiruchirappalli': 'Tamil Nadu',
    'trichy': 'Tamil Nadu',
    'salem': 'Tamil Nadu',
    'tirunelveli': 'Tamil Nadu',
    'tiruppur': 'Tamil Nadu',
    'erode': 'Tamil Nadu',
    'vellore': 'Tamil Nadu',
    'thanjavur': 'Tamil Nadu',

    // Odisha
    'bhubaneswar': 'Odisha',
    'bhubaneshwar': 'Odisha',
    'cuttack': 'Odisha',
    'rourkela': 'Odisha',
    'berhampur': 'Odisha',
    'sambalpur': 'Odisha',
    'puri': 'Odisha',
    'balasore': 'Odisha',

    // Goa
    'goa': 'Goa',
    'panaji': 'Goa',
    'panjim': 'Goa',
    'margao': 'Goa',
    'vasco': 'Goa',
    'vasco da gama': 'Goa',
    'mapusa': 'Goa',
    'ponda': 'Goa',

    // West Bengal
    'kolkata': 'West Bengal',
    'calcutta': 'West Bengal',
    'howrah': 'West Bengal',
    'durgapur': 'West Bengal',
    'asansol': 'West Bengal',
    'siliguri': 'West Bengal',
    'bardhaman': 'West Bengal',
    'malda': 'West Bengal',

    // Telangana
    'hyderabad': 'Telangana',
    'secunderabad': 'Telangana',
    'warangal': 'Telangana',
    'nizamabad': 'Telangana',
    'karimnagar': 'Telangana',
    'khammam': 'Telangana',

    // Andhra Pradesh
    'visakhapatnam': 'Andhra Pradesh',
    'vizag': 'Andhra Pradesh',
    'vijayawada': 'Andhra Pradesh',
    'guntur': 'Andhra Pradesh',
    'nellore': 'Andhra Pradesh',
    'kurnool': 'Andhra Pradesh',
    'tirupati': 'Andhra Pradesh',
    'kakinada': 'Andhra Pradesh',
    'rajahmundry': 'Andhra Pradesh',

    // Madhya Pradesh
    'indore': 'Madhya Pradesh',
    'bhopal': 'Madhya Pradesh',
    'jabalpur': 'Madhya Pradesh',
    'gwalior': 'Madhya Pradesh',
    'ujjain': 'Madhya Pradesh',
    'sagar': 'Madhya Pradesh',
    'satna': 'Madhya Pradesh',

    // Punjab
    'chandigarh': 'Chandigarh',
    'ludhiana': 'Punjab',
    'amritsar': 'Punjab',
    'jalandhar': 'Punjab',
    'patiala': 'Punjab',
    'bathinda': 'Punjab',
    'mohali': 'Punjab',

    // Haryana
    'gurugram': 'Haryana',
    'gurgaon': 'Haryana',
    'faridabad': 'Haryana',
    'panipat': 'Haryana',
    'ambala': 'Haryana',
    'rohtak': 'Haryana',
    'hisar': 'Haryana',
    'karnal': 'Haryana',
    'panchkula': 'Haryana',

    // Kerala
    'kochi': 'Kerala',
    'cochin': 'Kerala',
    'thiruvananthapuram': 'Kerala',
    'trivandrum': 'Kerala',
    'kozhikode': 'Kerala',
    'calicut': 'Kerala',
    'thrissur': 'Kerala',
    'kollam': 'Kerala',
    'kannur': 'Kerala',
    'alappuzha': 'Kerala',

    // Assam
    'guwahati': 'Assam',
    'dispur': 'Assam',
    'silchar': 'Assam',
    'dibrugarh': 'Assam',
    'jorhat': 'Assam',
    'nagaon': 'Assam',
    'tezpur': 'Assam',

    // Uttarakhand
    'dehradun': 'Uttarakhand',
    'haridwar': 'Uttarakhand',
    'roorkee': 'Uttarakhand',
    'haldwani': 'Uttarakhand',
    'rishikesh': 'Uttarakhand',
    'nainital': 'Uttarakhand',

    // Himachal Pradesh
    'shimla': 'Himachal Pradesh',
    'dharamshala': 'Himachal Pradesh',
    'solan': 'Himachal Pradesh',
    'mandi': 'Himachal Pradesh',
    'kullu': 'Himachal Pradesh',
    'manali': 'Himachal Pradesh',

    // Jammu and Kashmir
    'srinagar': 'Jammu and Kashmir',
    'jammu': 'Jammu and Kashmir',
    'anantnag': 'Jammu and Kashmir',
    'baramulla': 'Jammu and Kashmir',

    // Ladakh
    'leh': 'Ladakh',
    'kargil': 'Ladakh',

    // Andaman and Nicobar Islands
    'port blair': 'Andaman and Nicobar Islands',

    // Dadra and Nagar Haveli and Daman and Diu
    'silvassa': 'Dadra and Nagar Haveli and Daman and Diu',
    'daman': 'Dadra and Nagar Haveli and Daman and Diu',
    'diu': 'Dadra and Nagar Haveli and Daman and Diu',

    // Puducherry
    'puducherry': 'Puducherry',
    'pondicherry': 'Puducherry',

    // Sikkim
    'gangtok': 'Sikkim',

    // Jharkhand
    'ranchi': 'Jharkhand',
    'jamshedpur': 'Jharkhand',
    'dhanbad': 'Jharkhand',
    'bokaro': 'Jharkhand',

    // Chhattisgarh
    'raipur': 'Chhattisgarh',
    'bilaspur': 'Chhattisgarh',
    'bhilai': 'Chhattisgarh',
    'durg': 'Chhattisgarh',

    // Manipur
    'imphal': 'Manipur',

    // Meghalaya
    'shillong': 'Meghalaya',

    // Mizoram
    'aizawl': 'Mizoram',

    // Nagaland
    'kohima': 'Nagaland',
    'dimapur': 'Nagaland',

    // Tripura
    'agartala': 'Tripura',

    // Arunachal Pradesh
    'itanagar': 'Arunachal Pradesh'
  };

  /**
   * Helper: Normalize user city/state/query input into an authoritative State or UT name
   * @param {string} input - City, state, or phrase
   * @returns {string|null} - Normalized Jurisdiction name, or null if unmappable
   */
  function normalizeCityToState(input) {
    if (!input || typeof input !== 'string') return null;
    const clean = input.trim().toLowerCase();

    // 1. Direct match with jurisdiction names
    for (const record of JURISDICTIONS_DATA) {
      const jLower = record.jurisdiction.toLowerCase();
      if (clean === jLower || clean.includes(jLower)) {
        return record.jurisdiction;
      }
    }

    // 2. Handle composite format "City, State" (e.g. "Surat, Gujarat", "Bengaluru, Karnataka")
    if (clean.includes(',')) {
      const parts = clean.split(',').map(p => p.trim());
      // Check second part (state)
      for (const record of JURISDICTIONS_DATA) {
        if (parts[1] && parts[1].includes(record.jurisdiction.toLowerCase())) {
          return record.jurisdiction;
        }
      }
      // Check first part (city)
      if (parts[0] && CITY_TO_STATE_MAP[parts[0]]) {
        return CITY_TO_STATE_MAP[parts[0]];
      }
    }

    // 3. Exact city map lookup
    if (CITY_TO_STATE_MAP[clean]) {
      return CITY_TO_STATE_MAP[clean];
    }

    // 4. Substring / phrase match in city map (e.g. "in surat", "subsidy in jaipur", "bengaluru city")
    for (const [cityKey, mappedState] of Object.entries(CITY_TO_STATE_MAP)) {
      // Use word boundary check
      const regex = new RegExp(`\\b${cityKey}\\b`, 'i');
      if (regex.test(clean)) {
        return mappedState;
      }
    }

    return null;
  }

  /**
   * Authoritative Central Subsidy Engine (PM Surya Ghar: Muft Bijli Yojana)
   * Deterministic mathematical capping
   * @param {number} systemSizeKw - Capacity in kW
   * @param {string} category - "General" or "Special"
   * @returns {number} - Subsidy amount in INR
   */
  function calculateCentralSubsidy(systemSizeKw, category = "General") {
    const kw = Math.max(0, Number(systemSizeKw) || 0);
    if (kw <= 0) return 0;

    const isSpecial = (category && category.toLowerCase() === 'special');

    if (isSpecial) {
      // Special Category (NE, Hill states, UTs of J&K, Ladakh, A&N, Lakshadweep)
      // 1 kW: ₹36,000; 2 kW: ₹72,000; 3 kW+: ₹85,800 max
      if (kw <= 1.0) {
        return Math.round(kw * 36000);
      } else if (kw <= 2.0) {
        return Math.round(36000 + ((kw - 1.0) * 36000));
      } else if (kw <= 3.0) {
        return Math.round(72000 + ((kw - 2.0) * 13800));
      } else {
        return 85800; // Capped at ₹85,800
      }
    } else {
      // General Category States
      // 1 kW: ₹33,000; 2 kW: ₹66,000; 3 kW+: ₹78,000 max
      if (kw <= 1.0) {
        return Math.round(kw * 33000);
      } else if (kw <= 2.0) {
        return Math.round(33000 + ((kw - 1.0) * 33000));
      } else if (kw <= 3.0) {
        return Math.round(66000 + ((kw - 2.0) * 12000));
      } else {
        return 78000; // Capped at ₹78,000
      }
    }
  }

  /**
   * Authoritative State/UT Subsidy Engine
   * Deterministic lookup against validated policy records
   * @param {string} state - Normalized state/UT jurisdiction
   * @param {number} systemSizeKw - Capacity in kW
   * @returns {object} - { state, amount, status, notes, source, isProvisional }
   */
  function calculateStateSubsidy(state, systemSizeKw) {
    const kw = Math.max(0, Number(systemSizeKw) || 0);
    const normalizedState = normalizeCityToState(state) || state || 'Unknown';

    const record = JURISDICTIONS_DATA.find(
      j => j.jurisdiction.toLowerCase() === normalizedState.toLowerCase()
    );

    if (!record) {
      return {
        state: normalizedState,
        amount: 0,
        status: "Not verified",
        notes: "No additional state subsidy was verified in the current SolarWise database.",
        source: "SolarWise Database / MNRE National Portal",
        isProvisional: false
      };
    }

    let stateAmount = 0;
    const type = record.state_incentive_type;

    if (kw <= 0) {
      stateAmount = 0;
    } else if (record.jurisdiction === "Uttar Pradesh") {
      // UPNEDA: ₹15,000/kW up to 2 kW, capped at ₹30,000 max
      if (kw <= 1.0) {
        stateAmount = Math.round(kw * 15000);
      } else {
        stateAmount = Math.min(30000, Math.round(15000 + (kw - 1.0) * 15000));
      }
    } else if (record.jurisdiction === "Delhi") {
      // Delhi Solar Policy 2024: ₹2,000/kW state capex top-up, capped at ₹10,000
      stateAmount = Math.min(10000, Math.round(kw * 2000));
    } else if (record.jurisdiction === "Assam") {
      // APDCL state top-up: ₹15,000/kW up to ₹45,000
      stateAmount = Math.min(45000, Math.round(kw * 15000));
    } else {
      stateAmount = 0;
    }

    const isProvisional = (
      record.verification_status === "Provisional / verify before production use" ||
      record.verification_status === "Official existence; amount needs current order"
    );

    const notes = stateAmount > 0
      ? record.notes
      : "No additional state subsidy was verified in the current SolarWise database.";

    return {
      state: record.jurisdiction,
      amount: stateAmount,
      status: record.verification_status,
      notes: notes,
      source: record.source_or_verification_note,
      isProvisional: isProvisional
    };
  }

  /**
   * Master Total Subsidy Calculator
   * Central CFA + State/UT Incentive with zero double counting
   * @param {object} params - { state, systemSizeKw, category }
   * @returns {object} - Full deterministic subsidy breakdown
   */
  function calculateTotalSubsidy({ state, systemSizeKw, category }) {
    const kw = Math.max(0, Number(systemSizeKw) || 0);
    const normalizedState = normalizeCityToState(state) || state || 'Gujarat';

    const record = JURISDICTIONS_DATA.find(
      j => j.jurisdiction.toLowerCase() === normalizedState.toLowerCase()
    ) || JURISDICTIONS_DATA.find(j => j.jurisdiction === "Gujarat");

    const effectiveCategory = category || record.category || "General";
    const centralSubsidy = calculateCentralSubsidy(kw, effectiveCategory);
    const stateResult = calculateStateSubsidy(record.jurisdiction, kw);

    const totalSubsidy = centralSubsidy + stateResult.amount;

    let warningNotice = null;
    if (stateResult.isProvisional) {
      warningNotice = "State incentive requires verification against the latest state/DISCOM notification.";
    } else if (stateResult.amount === 0) {
      warningNotice = "Central subsidy information is available, but no additional state incentive was verified in the SolarWise database.";
    }

    return {
      jurisdiction: record.jurisdiction,
      state: record.jurisdiction,
      category: effectiveCategory,
      systemSizeKw: kw,
      centralSubsidy,
      stateSubsidy: stateResult.amount,
      totalSubsidy,
      verificationStatus: stateResult.status,
      isProvisional: stateResult.isProvisional,
      warningNotice,
      notes: record.notes,
      stateIncentiveDescription: record.state_incentive,
      source: record.source_or_verification_note,
      lastVerified: "September 2026",
      statutoryDisclaimer: "Subsidy figures are estimates based on the current SolarWise database and applicable published schemes. Final eligibility and sanctioned amount are determined by the relevant government authority/DISCOM."
    };
  }

  /**
   * Retrieve all 36 jurisdictions
   */
  function getAllJurisdictions() {
    return JURISDICTIONS_DATA.slice();
  }

  /**
   * Get jurisdiction record by name or city
   */
  function getJurisdictionData(stateOrCity) {
    const stateName = normalizeCityToState(stateOrCity) || stateOrCity;
    return JURISDICTIONS_DATA.find(
      j => j.jurisdiction.toLowerCase() === (stateName || '').toLowerCase()
    ) || null;
  }

  return {
    JURISDICTIONS_DATA,
    CITY_TO_STATE_MAP,
    normalizeCityToState,
    calculateCentralSubsidy,
    calculateStateSubsidy,
    calculateTotalSubsidy,
    getAllJurisdictions,
    getJurisdictionData
  };
}));
