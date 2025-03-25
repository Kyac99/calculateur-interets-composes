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
    
    let chart = null;
    
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
                            text: 'Valeur (€)'
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
        const formatter = new Intl.NumberFormat('fr-FR', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
        
        return formatter.format(Math.round(value)) + (includeSymbol ? ' €' : '');
    }
});