// =============================================
// SYSTEME DE TRADUCTION (i18n)
// =============================================

var i18n = {
    currentLang: 'fr',

    translations: {
        fr: {
            title: "Calculateur d'Intérêts Composés",
            tab_simulator: "📈 Simulateur",
            tab_objective: "🎯 Objectif",
            select_currency: "Sélectionner votre devise",
            currency_main: "Devises principales",
            currency_african: "Devises africaines",
            initial_capital: "Capital initial",
            contribution_amount: "Montant du versement",
            frequency: "Fréquence",
            freq_monthly: "Mensuel",
            freq_quarterly: "Trimestriel",
            freq_semiannual: "Semestriel",
            freq_annual: "Annuel",
            annual_rate: "Taux d'intérêt annuel (%)",
            investment_period: "Durée d'investissement (années)",
            advanced_options_down: "Options avancées ⤵",
            advanced_options_up: "Options avancées ⤴",
            annual_increase: "Augmentation annuelle des versements (%)",
            compound_frequency: "Fréquence de capitalisation des intérêts",
            compound_monthly: "Mensuelle",
            compound_quarterly: "Trimestrielle",
            compound_semiannual: "Semestrielle",
            compound_annual: "Annuelle",
            compound_daily: "Journalière",
            tax_rate: "Taux d'imposition sur les plus-values (%)",
            calculate: "Calculer",
            reset: "Réinitialiser",
            results_title: "Résultats",
            total_invested: "Montant total investi",
            interest_earned: "Intérêts gagnés",
            gross_final: "Valeur finale brute",
            after_tax: "Valeur finale après impôts",
            global_return: "📊 Rendement global",
            objective_info: "💡 Définissez votre objectif financier et découvrez combien vous devez investir régulièrement pour l'atteindre.",
            target_amount: "Montant cible à atteindre",
            initial_capital_optional: "Capital initial (optionnel)",
            target_years: "Nombre d'années pour atteindre l'objectif",
            estimated_rate: "Taux d'intérêt annuel estimé (%)",
            calculate_contributions: "Calculer les versements",
            required_contributions: "Versements nécessaires",
            monthly: "Mensuel",
            quarterly: "Trimestriel",
            semiannual: "Semestriel",
            annual: "Annuel",
            total_to_invest_monthly: "Total à investir (versements mensuels)",
            interest_generated: "Intérêts générés",
            frequency_desc_template: "Soit {amount} par an ({count} versement{plural} {freqLabel}{plural})",
            freq_label_12: "mensuel",
            freq_label_4: "trimestriel",
            freq_label_2: "semestriel",
            freq_label_1: "annuel",
            chart_total_value: "Valeur totale",
            chart_invested: "Montants investis",
            chart_interest: "Intérêts cumulés",
            chart_projection: "Projection",
            chart_target: "Objectif",
            chart_years: "Années",
            chart_value: "Valeur",
            alert_invalid: "Veuillez entrer un montant cible et une durée valides.",
            cur_EUR: "Euro (€)", cur_USD: "Dollar américain ($)", cur_GBP: "Livre sterling (£)",
            cur_JPY: "Yen japonais (¥)", cur_CHF: "Franc suisse (CHF)", cur_CAD: "Dollar canadien (CAD)",
            cur_AUD: "Dollar australien (AUD)", cur_XOF: "Franc CFA - UEMOA (FCFA)",
            cur_XAF: "Franc CFA - CEMAC (FCFA)", cur_ZAR: "Rand sud-africain (ZAR)",
            cur_NGN: "Naira nigérian (₦)", cur_EGP: "Livre égyptienne (E£)",
            cur_GHS: "Cedi ghanéen (GH₵)", cur_KES: "Shilling kényan (KSh)",
            cur_MAD: "Dirham marocain (MAD)", cur_DZD: "Dinar algérien (DZD)",
            cur_TND: "Dinar tunisien (TND)", cur_MUR: "Roupie mauricienne (Rs)",
            cur_CVE: "Escudo cap-verdien (CVE)", cur_GMD: "Dalasi gambien (GMD)",
            cur_GNF: "Franc guinéen (GNF)", cur_SLL: "Leone sierra-léonais (SLL)",
            cur_LRD: "Dollar libérien (LRD)", cur_ETB: "Birr éthiopien (ETB)",
            cur_DJF: "Franc djiboutien (DJF)", cur_SOS: "Shilling somalien (SOS)",
            cur_UGX: "Shilling ougandais (UGX)", cur_TZS: "Shilling tanzanien (TZS)",
            cur_RWF: "Franc rwandais (RWF)", cur_BIF: "Franc burundais (BIF)",
            cur_MGA: "Ariary malgache (MGA)", cur_MZN: "Metical mozambicain (MZN)",
            cur_ZMW: "Kwacha zambien (ZMW)", cur_BWP: "Pula botswanais (BWP)",
            cur_NAD: "Dollar namibien (NAD)", cur_SZL: "Lilangeni swazi (SZL)",
            cur_LSL: "Loti lesothan (LSL)", cur_SCR: "Roupie seychelloise (SCR)",
            cur_SDG: "Livre soudanaise (SDG)", cur_SSP: "Livre sud-soudanaise (SSP)",
            cur_AOA: "Kwanza angolais (AOA)", cur_CDF: "Franc congolais (CDF)"
        },
        en: {
            title: "Compound Interest Calculator",
            tab_simulator: "📈 Simulator",
            tab_objective: "🎯 Goal",
            select_currency: "Select your currency",
            currency_main: "Major currencies",
            currency_african: "African currencies",
            initial_capital: "Initial capital",
            contribution_amount: "Contribution amount",
            frequency: "Frequency",
            freq_monthly: "Monthly",
            freq_quarterly: "Quarterly",
            freq_semiannual: "Semi-annual",
            freq_annual: "Annual",
            annual_rate: "Annual interest rate (%)",
            investment_period: "Investment period (years)",
            advanced_options_down: "Advanced options ⤵",
            advanced_options_up: "Advanced options ⤴",
            annual_increase: "Annual contribution increase (%)",
            compound_frequency: "Interest compounding frequency",
            compound_monthly: "Monthly",
            compound_quarterly: "Quarterly",
            compound_semiannual: "Semi-annual",
            compound_annual: "Annual",
            compound_daily: "Daily",
            tax_rate: "Capital gains tax rate (%)",
            calculate: "Calculate",
            reset: "Reset",
            results_title: "Results",
            total_invested: "Total amount invested",
            interest_earned: "Interest earned",
            gross_final: "Gross final value",
            after_tax: "Final value after taxes",
            global_return: "📊 Overall return",
            objective_info: "💡 Set your financial goal and find out how much you need to invest regularly to reach it.",
            target_amount: "Target amount",
            initial_capital_optional: "Initial capital (optional)",
            target_years: "Number of years to reach the goal",
            estimated_rate: "Estimated annual interest rate (%)",
            calculate_contributions: "Calculate contributions",
            required_contributions: "Required contributions",
            monthly: "Monthly",
            quarterly: "Quarterly",
            semiannual: "Semi-annual",
            annual: "Annual",
            total_to_invest_monthly: "Total to invest (monthly contributions)",
            interest_generated: "Interest generated",
            frequency_desc_template: "i.e. {amount} per year ({count} {freqLabel} contribution{plural})",
            freq_label_12: "monthly",
            freq_label_4: "quarterly",
            freq_label_2: "semi-annual",
            freq_label_1: "annual",
            chart_total_value: "Total value",
            chart_invested: "Amounts invested",
            chart_interest: "Cumulative interest",
            chart_projection: "Projection",
            chart_target: "Goal",
            chart_years: "Years",
            chart_value: "Value",
            alert_invalid: "Please enter a valid target amount and duration.",
            cur_EUR: "Euro (€)", cur_USD: "US Dollar ($)", cur_GBP: "British Pound (£)",
            cur_JPY: "Japanese Yen (¥)", cur_CHF: "Swiss Franc (CHF)", cur_CAD: "Canadian Dollar (CAD)",
            cur_AUD: "Australian Dollar (AUD)", cur_XOF: "CFA Franc - WAEMU (FCFA)",
            cur_XAF: "CFA Franc - CEMAC (FCFA)", cur_ZAR: "South African Rand (ZAR)",
            cur_NGN: "Nigerian Naira (₦)", cur_EGP: "Egyptian Pound (E£)",
            cur_GHS: "Ghanaian Cedi (GH₵)", cur_KES: "Kenyan Shilling (KSh)",
            cur_MAD: "Moroccan Dirham (MAD)", cur_DZD: "Algerian Dinar (DZD)",
            cur_TND: "Tunisian Dinar (TND)", cur_MUR: "Mauritian Rupee (Rs)",
            cur_CVE: "Cape Verdean Escudo (CVE)", cur_GMD: "Gambian Dalasi (GMD)",
            cur_GNF: "Guinean Franc (GNF)", cur_SLL: "Sierra Leonean Leone (SLL)",
            cur_LRD: "Liberian Dollar (LRD)", cur_ETB: "Ethiopian Birr (ETB)",
            cur_DJF: "Djiboutian Franc (DJF)", cur_SOS: "Somali Shilling (SOS)",
            cur_UGX: "Ugandan Shilling (UGX)", cur_TZS: "Tanzanian Shilling (TZS)",
            cur_RWF: "Rwandan Franc (RWF)", cur_BIF: "Burundian Franc (BIF)",
            cur_MGA: "Malagasy Ariary (MGA)", cur_MZN: "Mozambican Metical (MZN)",
            cur_ZMW: "Zambian Kwacha (ZMW)", cur_BWP: "Botswanan Pula (BWP)",
            cur_NAD: "Namibian Dollar (NAD)", cur_SZL: "Swazi Lilangeni (SZL)",
            cur_LSL: "Lesotho Loti (LSL)", cur_SCR: "Seychellois Rupee (SCR)",
            cur_SDG: "Sudanese Pound (SDG)", cur_SSP: "South Sudanese Pound (SSP)",
            cur_AOA: "Angolan Kwanza (AOA)", cur_CDF: "Congolese Franc (CDF)"
        }
    },

    t: function(key) {
        return this.translations[this.currentLang][key] || key;
    },

    setLanguage: function(lang) {
        this.currentLang = lang;
        document.documentElement.lang = lang;
        document.querySelectorAll('.lang-btn').forEach(function(btn) {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        document.querySelectorAll('[data-i18n]').forEach(function(el) {
            var key = el.getAttribute('data-i18n');
            var text = i18n.translations[lang][key];
            if (text) { el.textContent = text; }
        });
        document.querySelectorAll('[data-i18n-label]').forEach(function(el) {
            var key = el.getAttribute('data-i18n-label');
            var text = i18n.translations[lang][key];
            if (text) { el.label = text; }
        });
        document.title = i18n.translations[lang].title;
    }
};

document.querySelectorAll('.lang-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        i18n.setLanguage(btn.dataset.lang);
        if (typeof onLanguageChanged === 'function') { onLanguageChanged(); }
    });
});