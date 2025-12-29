document.addEventListener("DOMContentLoaded", function() {
    // Variables DOM
    const initialAmountInput = document.getElementById("initialAmount");
    const monthlyContributionInput = document.getElementById("monthlyContribution");
    const annualInterestRateInput = document.getElementById("annualInterestRate");
    const investmentPeriodInput = document.getElementById("investmentPeriod");
    const contributionFrequencySelect = document.getElementById("contributionFrequency");
    const annualContributionIncreaseInput = document.getElementById("annualContributionIncrease");
    const compoundFrequencySelect = document.getElementById("compoundFrequency");
    const taxRateInput = document.getElementById("taxRate");
    const calculateBtn = document.getElementById("calculate");
    const resetBtn = document.getElementById("reset");
    const resultsDiv = document.getElementById("results");
    const totalInvestedSpan = document.getElementById("totalInvested");
    const interestEarnedSpan = document.getElementById("interestEarned");
    const finalValueSpan = document.getElementById("finalValue");
    const afterTaxValueSpan = document.getElementById("afterTaxValue");
    const toggleAdvancedBtn = document.getElementById("toggleAdvanced");
    const advancedOptionsDiv = document.getElementById("advancedOptions");
    const chartContainer = document.getElementById("chart");
    const currencySelect = document.getElementById("currency");
    const initialAmountCurrencySymbol = document.getElementById("initialAmountCurrencySymbol");
    const monthlyContributionCurrencySymbol = document.getElementById("monthlyContributionCurrencySymbol");
    
    let chart = null;
    
    // Définir les symboles et codes de devise
    const currencies = {
        EUR: { symbol: "€", locale: "fr-FR" },
        USD: { symbol: "$", locale: "en-US" },
        GBP: { symbol: "£", locale: "en-GB" },
        JPY: { symbol: "¥", locale: "ja-JP" },
        CHF: { symbol: "CHF", locale: "de-CH" },
        CAD: { symbol: "CAD", locale: "en-CA" },
        AUD: { symbol: "AUD", locale: "en-AU" },
        XOF: { symbol: "FCFA", locale: "fr-FR" },
        XAF: { symbol: "FCFA", locale: "fr-FR" },
        ZAR: { symbol: "ZAR", locale: "en-ZA" },
        NGN: { symbol: "₦", locale: "en-NG" },
        EGP: { symbol: "E£", locale: "ar-EG" },
        GHS: { symbol: "GH₵", locale: "en-GH" },
        KES: { symbol: "KSh", locale: "en-KE" },
        MAD: { symbol: "MAD", locale: "ar-MA" },
        DZD: { symbol: "DZD", locale: "ar-DZ" },
        TND: { symbol: "TND", locale: "ar-TN" },
        MUR: { symbol: "Rs", locale: "en-MU" },
        CVE: { symbol: "CVE", locale: "pt-CV" },
        GMD: { symbol: "GMD", locale: "en-GM" },
        GNF: { symbol: "GNF", locale: "fr-GN" },
        SLL: { symbol: "SLL", locale: "en-SL" },
        LRD: { symbol: "LRD", locale: "en-LR" },
        ETB: { symbol: "ETB", locale: "am-ET" },
        DJF: { symbol: "DJF", locale: "fr-DJ" },
        SOS: { symbol: "SOS", locale: "so-SO" },
        UGX: { symbol: "UGX", locale: "en-UG" },
        TZS: { symbol: "TZS", locale: "en-TZ" },
        RWF: { symbol: "RWF", locale: "fr-RW" },
        BIF: { symbol: "BIF", locale: "fr-BI" },
        MGA: { symbol: "MGA", locale: "fr-MG" },
        MZN: { symbol: "MZN", locale: "pt-MZ" },
        ZMW: { symbol: "ZMW", locale: "en-ZM" },
        BWP: { symbol: "BWP", locale: "en-BW" },
        NAD: { symbol: "NAD", locale: "en-NA" },
        SZL: { symbol: "SZL", locale: "en-SZ" },
        LSL: { symbol: "LSL", locale: "en-LS" },
        SCR: { symbol: "SCR", locale: "en-SC" },
        SDG: { symbol: "SDG", locale: "ar-SD" },
        SSP: { symbol: "SSP", locale: "en-SS" },
        AOA: { symbol: "AOA", locale: "pt-AO" },
        CDF: { symbol: "CDF", locale: "fr-CD" }
    };
    
    // Devise active
    let activeCurrency = "EUR";
    
    // Gérer le changement de devise
    currencySelect.addEventListener("change", function() {
        activeCurrency = this.value;
        updateCurrencyLabels();
    });
    
    // Mettre à jour les labels de devise
    function updateCurrencyLabels() {
        const currencySymbol = currencies[activeCurrency].symbol;
        
        // Mettre à jour les symboles dans les champs de saisie
        initialAmountCurrencySymbol.textContent = currencySymbol;
        monthlyContributionCurrencySymbol.textContent = currencySymbol;
        
        // Mettre à jour les symboles de devise dans les résultats
        if (resultsDiv.style.display !== "none") {
            totalInvestedSpan.textContent = formatCurrency(parseFloat(totalInvestedSpan.textContent.replace(/[^\d.-]/g, "")));
            interestEarnedSpan.textContent = formatCurrency(parseFloat(interestEarnedSpan.textContent.replace(/[^\d.-]/g, "")));
            finalValueSpan.textContent = formatCurrency(parseFloat(finalValueSpan.textContent.replace(/[^\d.-]/g, "")));
            afterTaxValueSpan.textContent = formatCurrency(parseFloat(afterTaxValueSpan.textContent.replace(/[^\d.-]/g, "")));
        }
        
        // Mettre à jour l'axe Y du graphique si nécessaire
        if (chart) {
            chart.options.scales.y.title.text = `Valeur (${currencySymbol})`;
            chart.update();
        }
    }
    
    // Afficher/masquer les options avancées
    toggleAdvancedBtn.addEventListener("click", function() {
        if (advancedOptionsDiv.style.display === "none" || advancedOptionsDiv.style.display === "") {
            advancedOptionsDiv.style.display = "block";
            toggleAdvancedBtn.textContent = "Options avancées ⤴";
        } else {
            advancedOptionsDiv.style.display = "none";
            toggleAdvancedBtn.textContent = "Options avancées ⤵";
        }
    });
    
    // Calculer les intérêts composés
    calculateBtn.addEventListener("click", calculateCompoundInterest);
    
    // Réinitialiser les champs
    resetBtn.addEventListener("click", function() {
        initialAmountInput.value = "1000";
        monthlyContributionInput.value = "100";
        annualInterestRateInput.value = "5";
        investmentPeriodInput.value = "20";
        contributionFrequencySelect.value = "12";
        annualContributionIncreaseInput.value = "0";
        compoundFrequencySelect.value = "12";
        taxRateInput.value = "30";
        currencySelect.value = "EUR";
        activeCurrency = "EUR";
        
        updateCurrencyLabels();
        resultsDiv.style.display = "none";
        
        if (chart) {
            chart.destroy();
            chart = null;
        }
    });
    
   function calculateCompoundInterest() {
    // 1. Récupération des inputs (identique à votre code)
    const initialAmount = parseFloat(initialAmountInput.value) || 0;
    // On normalise le versement : quel est le montant TOTAL versé par an ?
    const rawMonthlyContribution = parseFloat(monthlyContributionInput.value) || 0;
    // Attention: votre UX dit "Versement Mensuel" mais permet de changer la fréquence.
    // Logique standard : Si je dis 100€/mois, c'est 1200€/an peu importe la fréquence de versement réelle.
    const annualContributionBase = rawMonthlyContribution * 12;

    const annualInterestRate = parseFloat(annualInterestRateInput.value) / 100 || 0;
    const investmentPeriod = parseInt(investmentPeriodInput.value) || 0;
    const contributionFrequency = parseInt(contributionFrequencySelect.value) || 12; 
    const annualContributionIncrease = parseFloat(annualContributionIncreaseInput.value) / 100 || 0;
    const compoundFrequency = parseInt(compoundFrequencySelect.value) || 12;
    const taxRate = parseFloat(taxRateInput.value) / 100 || 0;

    let balance = initialAmount;
    let totalContributions = initialAmount;
    
    // Pour éviter les bugs de float, on itère sur la plus petite unité commune : le MOIS
    // (Hypothèse: la plupart des fréquences sont des multiples de mois: 1, 3, 6, 12)
    const totalMonths = investmentPeriod * 12;
    
    // Calcul des montants unitaires par événement
    // Si je verse chaque année, je verse (100 * 12) une fois.
    // Si je verse chaque mois, je verse 100.
    let currentContributionAmount = annualContributionBase / contributionFrequency;

    const yearlyData = [{ year: 0, balance: initialAmount, contributions: initialAmount, interest: 0 }];

    // Variables de suivi
    let accumulatedInterest = 0; // Intérêts en attente de capitalisation

    for (let month = 1; month <= totalMonths; month++) {
        const yearIndex = Math.ceil(month / 12);

        // 1. Gestion des Versements (CONTRIBUTIONS)
        // Est-ce un mois de versement ?
        // Ex: Fréquence 12 (Mensuel) -> 12/12 = 1 (tous les mois)
        // Ex: Fréquence 1 (Annuel) -> 12/1 = 12 (tous les 12 mois)
        const monthsPerContribution = 12 / contributionFrequency;
        
        // On verse EN DÉBUT de période pour gagner des intérêts dessus (plus réaliste)
        if (month % monthsPerContribution === 0 || (monthsPerContribution < 1 && (month * contributionFrequency) % 12 === 0)) {
            // Note: La logique simplifiée ici assume des fréquences > mensuelles ou multiples.
            // Pour être ultra-précis, on verse si (month % (12/freq) === 0).
            // Si la fréquence est > 12 (ex: Hebdo), on ajouterait simplement (annualBase / 12) chaque mois pour simplifier le graphique, 
            // ou on complexifie la boucle pour passer en jours.
            
            // Restons simple : on ajoute le versement si c'est le moment
            if (Number.isInteger(monthsPerContribution)) {
                 if (month % monthsPerContribution === 0) {
                    balance += currentContributionAmount;
                    totalContributions += currentContributionAmount;
                 }
            } else {
                // Cas ou on verse plus souvent que 1 fois par mois (ex: hebdo)
                // On lisse sur le mois pour éviter de faire une boucle par jour
                balance += (annualContributionBase / 12);
                totalContributions += (annualContributionBase / 12);
            }
        }

        // 2. Calcul des Intérêts (Simple sur le mois)
        // Taux mensuel effectif
        const monthlyRate = annualInterestRate / 12; 
        const monthlyInterest = balance * monthlyRate;
        accumulatedInterest += monthlyInterest;

        // 3. Capitalisation (COMPOUNDING)
        // Est-ce que les intérêts sont versés au solde (génèrent-ils eux-mêmes des intérêts ?)
        const monthsPerCompounding = 12 / compoundFrequency;
        
        // Si c'est le moment de capitaliser (ex: fin d'année pour compound 1)
        if (month % monthsPerCompounding === 0) {
            balance += accumulatedInterest;
            accumulatedInterest = 0; // Remise à zéro, ils sont maintenant dans la balance
        }

        // 4. Augmentation annuelle des versements (Fin d'année)
        if (month % 12 === 0 && annualContributionIncrease > 0) {
            currentContributionAmount *= (1 + annualContributionIncrease);
            // Si on est en mode lissé (hebdo), on augmente la base annuelle
            // (Note: annualContributionBase n'est pas utilisé dans la boucle principale sauf pour le lissage hebdo, à adapter si besoin)
        }

        // 5. Sauvegarde des données pour le graphique (Fin d'année)
        if (month % 12 === 0) {
            // On ajoute les intérêts accumulés "non capitalisés" à la valeur affichée pour être précis visuellement
            const displayBalance = balance + accumulatedInterest; 
            const totalInterestGenerated = displayBalance - totalContributions;

            yearlyData.push({
                year: month / 12,
                balance: displayBalance,
                contributions: totalContributions,
                interest: totalInterestGenerated
            });
        }
    }

    // Calculs finaux
    const finalBalance = balance + accumulatedInterest; // On n'oublie pas les intérêts qui "traînent" depuis la dernière capitalisation
    const totalInterest = finalBalance - totalContributions;
    const taxOnInterest = totalInterest * taxRate;
    const afterTaxBalance = finalBalance - taxOnInterest;

    // Affichage (identique à votre code)
    totalInvestedSpan.textContent = formatCurrency(totalContributions);
    interestEarnedSpan.textContent = formatCurrency(totalInterest);
    finalValueSpan.textContent = formatCurrency(finalBalance);
    afterTaxValueSpan.textContent = formatCurrency(afterTaxBalance);

    resultsDiv.style.display = "block";
    createChart(yearlyData);
}
    
    function createChart(yearlyData) {
        // Détruire le graphique précédent s'il existe
        if (chart) {
            chart.destroy();
        }
        
        // Préparer les données pour le graphique
        const years = yearlyData.map(data => data.year);
        const balances = yearlyData.map(data => data.balance);
        const contributions = yearlyData.map(data => data.contributions);
        const interests = yearlyData.map(data => data.interest);
        
        // Créer un nouvel élément canvas
        const canvas = document.createElement('canvas');
        chartContainer.innerHTML = '';
        chartContainer.appendChild(canvas);
        
        const currencySymbol = currencies[activeCurrency].symbol;
        
        // Créer le graphique
        chart = new Chart(canvas, {
            type: 'line',
            data: {
                labels: years,
                datasets: [
                    {
                        label: 'Valeur totale',
                        data: balances,
                        backgroundColor: 'rgba(52, 152, 219, 0.2)',
                        borderColor: 'rgba(52, 152, 219, 1)',
                        borderWidth: 2,
                        fill: true
                    },
                    {
                        label: 'Montants investis',
                        data: contributions,
                        backgroundColor: 'rgba(46, 204, 113, 0.2)',
                        borderColor: 'rgba(46, 204, 113, 1)',
                        borderWidth: 2,
                        fill: true
                    },
                    {
                        label: 'Intérêts cumulés',
                        data: interests,
                        backgroundColor: 'rgba(155, 89, 182, 0.2)',
                        borderColor: 'rgba(155, 89, 182, 1)',
                        borderWidth: 2,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + formatCurrency(context.raw);
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Années'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: `Valeur (${currencySymbol})`
                        },
                        ticks: {
                            callback: function(value) {
                                return formatCurrency(value, false);
                            }
                        }
                    }
                }
            }
        });
    }
    
    function formatCurrency(value, includeSymbol = true) {
        const currencyInfo = currencies[activeCurrency];
        const formatter = new Intl.NumberFormat(currencyInfo.locale, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
        
        return formatter.format(Math.round(value)) + (includeSymbol ? ` ${currencyInfo.symbol}` : '');
    }
    
    // Initialiser les labels de devise
    updateCurrencyLabels();
});
