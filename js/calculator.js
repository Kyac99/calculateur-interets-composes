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
        
        // Mettre à jour les libellés des montants d'entrée
        document.querySelectorAll("label[for='initialAmount'], label[for='monthlyContribution']").forEach(label => {
            const baseText = label.textContent.split("(")[0].trim();
            label.textContent = `${baseText}`;
        });
        
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
        // Récupérer les valeurs d'entrée
        const initialAmount = parseFloat(initialAmountInput.value) || 0;
        const monthlyContribution = parseFloat(monthlyContributionInput.value) || 0;
        const annualInterestRate = parseFloat(annualInterestRateInput.value) / 100 || 0;
        const investmentPeriod = parseInt(investmentPeriodInput.value) || 0;
        const contributionFrequency = parseInt(contributionFrequencySelect.value) || 12;
        const annualContributionIncrease = parseFloat(annualContributionIncreaseInput.value) / 100 || 0;
        const compoundFrequency = parseInt(compoundFrequencySelect.value) || 12;
        const taxRate = parseFloat(taxRateInput.value) / 100 || 0;
        
        // Périodes mensuelles totales
        const totalMonths = investmentPeriod * 12;
        
        // Taux d'intérêt par période de capitalisation
        const interestRatePerPeriod = annualInterestRate / compoundFrequency;
        
        // Nombre de périodes de capitalisation sur la durée totale
        const totalCompoundingPeriods = investmentPeriod * compoundFrequency;
        
        let balance = initialAmount;
        let totalContributions = initialAmount;
        let currentContribution = monthlyContribution * (12 / contributionFrequency);
        
        const yearlyData = [{
            year: 0,
            balance: initialAmount,
            contributions: initialAmount,
            interest: 0
        }];
        
        // Pour chaque période de capitalisation
        for (let period = 1; period <= totalCompoundingPeriods; period++) {
            // Calculer intérêts pour cette période
            const interest = balance * interestRatePerPeriod;
            balance += interest;
            
            // Si c'est le moment d'ajouter une contribution
            if (period % (compoundFrequency / contributionFrequency) === 0) {
                balance += currentContribution;
                totalContributions += currentContribution;
                
                // Si c'est la fin d'une année, augmenter la contribution
                if (period % compoundFrequency === 0) {
                    currentContribution *= (1 + annualContributionIncrease);
                }
            }
            
            // Enregistrer les données annuelles pour le graphique
            if (period % compoundFrequency === 0) {
                const year = period / compoundFrequency;
                const previousBalance = yearlyData[yearlyData.length - 1].balance;
                const interestForYear = balance - previousBalance - (totalContributions - yearlyData[yearlyData.length - 1].contributions);
                
                yearlyData.push({
                    year: year,
                    balance: balance,
                    contributions: totalContributions,
                    interest: yearlyData[yearlyData.length - 1].interest + interestForYear
                });
            }
        }
        
        // Calculer les valeurs finales
        const finalBalance = balance;
        const totalInterest = finalBalance - totalContributions;
        const taxOnInterest = totalInterest * taxRate;
        const afterTaxBalance = finalBalance - taxOnInterest;
        
        // Afficher les résultats
        totalInvestedSpan.textContent = formatCurrency(totalContributions);
        interestEarnedSpan.textContent = formatCurrency(totalInterest);
        finalValueSpan.textContent = formatCurrency(finalBalance);
        afterTaxValueSpan.textContent = formatCurrency(afterTaxBalance);
        
        resultsDiv.style.display = "block";
        
        // Mettre à jour le graphique
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