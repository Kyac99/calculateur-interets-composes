document.addEventListener("DOMContentLoaded", function() {
    // =============================================
    // VARIABLES DOM - ONGLET SIMULATEUR
    // =============================================
    const initialAmountInput = document.getElementById("initialAmount");
    const contributionAmountInput = document.getElementById("contributionAmount");
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
    const frequencyDescription = document.getElementById("frequencyDescription");
    
    // =============================================
    // VARIABLES DOM - ONGLET OBJECTIF
    // =============================================
    const targetAmountInput = document.getElementById("targetAmount");
    const initialAmount2Input = document.getElementById("initialAmount2");
    const targetYearsInput = document.getElementById("targetYears");
    const targetInterestRateInput = document.getElementById("targetInterestRate");
    const compoundFrequency2Select = document.getElementById("compoundFrequency2");
    const calculateObjectiveBtn = document.getElementById("calculateObjective");
    const resetObjectiveBtn = document.getElementById("resetObjective");
    const resultsObjectiveDiv = document.getElementById("resultsObjective");
    const toggleAdvanced2Btn = document.getElementById("toggleAdvanced2");
    const advancedOptions2Div = document.getElementById("advancedOptions2");
    const chartObjectiveContainer = document.getElementById("chartObjective");
    
    const monthlyRequiredSpan = document.getElementById("monthlyRequired");
    const quarterlyRequiredSpan = document.getElementById("quarterlyRequired");
    const semiAnnualRequiredSpan = document.getElementById("semiAnnualRequired");
    const annualRequiredSpan = document.getElementById("annualRequired");
    const totalToInvestSpan = document.getElementById("totalToInvest");
    const interestGeneratedSpan = document.getElementById("interestGenerated");
    
    // =============================================
    // VARIABLES DOM - COMMUNES
    // =============================================
    const currencySelect = document.getElementById("currency");
    const tabBtns = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");
    
    // Symboles de devise dans les champs
    const currencySymbols = [
        document.getElementById("initialAmountCurrencySymbol"),
        document.getElementById("contributionAmountCurrencySymbol"),
        document.getElementById("targetAmountCurrencySymbol"),
        document.getElementById("initialAmount2CurrencySymbol")
    ];
    
    let chart = null;
    let chartObjective = null;
    
    // =============================================
    // DÉFINITION DES DEVISES
    // =============================================
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
    
    let activeCurrency = "EUR";
    
    // =============================================
    // GESTION DES ONGLETS
    // =============================================
    tabBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            const tabId = this.getAttribute("data-tab");
            
            // Désactiver tous les onglets
            tabBtns.forEach(b => b.classList.remove("active"));
            tabContents.forEach(c => c.classList.remove("active"));
            
            // Activer l'onglet sélectionné
            this.classList.add("active");
            document.getElementById(tabId).classList.add("active");
        });
    });
    
    // =============================================
    // GESTION DE LA DEVISE
    // =============================================
    currencySelect.addEventListener("change", function() {
        activeCurrency = this.value;
        updateCurrencyLabels();
        updateFrequencyDescription();
    });
    
    function updateCurrencyLabels() {
        const currencySymbol = currencies[activeCurrency].symbol;
        
        // Mettre à jour tous les symboles de devise
        currencySymbols.forEach(span => {
            if (span) span.textContent = currencySymbol;
        });
        
        // Mettre à jour l'axe Y des graphiques
        if (chart) {
            chart.options.scales.y.title.text = `Valeur (${currencySymbol})`;
            chart.update();
        }
        if (chartObjective) {
            chartObjective.options.scales.y.title.text = `Valeur (${currencySymbol})`;
            chartObjective.update();
        }
    }
    
    // =============================================
    // MISE À JOUR DE LA DESCRIPTION DE FRÉQUENCE
    // =============================================
    function updateFrequencyDescription() {
        const amount = parseFloat(contributionAmountInput.value) || 0;
        const frequency = parseInt(contributionFrequencySelect.value) || 12;
        const annualAmount = amount * frequency;
        const symbol = currencies[activeCurrency].symbol;
        
        const frequencyLabels = {
            12: "mensuel",
            4: "trimestriel",
            2: "semestriel",
            1: "annuel"
        };
        
        frequencyDescription.textContent = `Soit ${formatCurrency(annualAmount)} par an (${frequency} versement${frequency > 1 ? 's' : ''} ${frequencyLabels[frequency]}${frequency > 1 ? 's' : ''})`;
    }
    
    contributionAmountInput.addEventListener("input", updateFrequencyDescription);
    contributionFrequencySelect.addEventListener("change", updateFrequencyDescription);
    
    // =============================================
    // OPTIONS AVANCÉES
    // =============================================
    toggleAdvancedBtn.addEventListener("click", function() {
        if (advancedOptionsDiv.style.display === "none" || advancedOptionsDiv.style.display === "") {
            advancedOptionsDiv.style.display = "block";
            toggleAdvancedBtn.textContent = "Options avancées ⤴";
        } else {
            advancedOptionsDiv.style.display = "none";
            toggleAdvancedBtn.textContent = "Options avancées ⤵";
        }
    });
    
    toggleAdvanced2Btn.addEventListener("click", function() {
        if (advancedOptions2Div.style.display === "none" || advancedOptions2Div.style.display === "") {
            advancedOptions2Div.style.display = "block";
            toggleAdvanced2Btn.textContent = "Options avancées ⤴";
        } else {
            advancedOptions2Div.style.display = "none";
            toggleAdvanced2Btn.textContent = "Options avancées ⤵";
        }
    });
    
    // =============================================
    // CALCUL DES INTÉRÊTS COMPOSÉS (SIMULATEUR)
    // =============================================
    calculateBtn.addEventListener("click", calculateCompoundInterest);
    
    function calculateCompoundInterest() {
        // Récupération des paramètres
        const initialAmount = parseFloat(initialAmountInput.value) || 0;
        const contributionAmount = parseFloat(contributionAmountInput.value) || 0;
        const annualInterestRate = parseFloat(annualInterestRateInput.value) / 100 || 0;
        const investmentPeriod = parseInt(investmentPeriodInput.value) || 0;
        const contributionFrequency = parseInt(contributionFrequencySelect.value) || 12;
        const annualContributionIncrease = parseFloat(annualContributionIncreaseInput.value) / 100 || 0;
        const compoundFrequency = parseInt(compoundFrequencySelect.value) || 12;
        const taxRate = parseFloat(taxRateInput.value) / 100 || 0;
        
        // Calcul précis période par période
        // On utilise la fréquence de capitalisation comme unité de temps de base
        const periodsPerYear = compoundFrequency;
        const totalPeriods = investmentPeriod * periodsPerYear;
        const ratePerPeriod = annualInterestRate / periodsPerYear;
        
        // Nombre de versements par an
        const contributionsPerYear = contributionFrequency;
        
        // Montant du versement (peut augmenter chaque année)
        let currentContributionAmount = contributionAmount;
        
        let balance = initialAmount;
        let totalContributions = initialAmount;
        
        const yearlyData = [{ year: 0, balance: initialAmount, contributions: initialAmount, interest: 0 }];
        
        // Préparation des variables de temps
        const totalMonths = investmentPeriod * 12; // On itère toujours en mois pour la précision
        let accumulatedInterest = 0; // "Salle d'attente" pour les intérêts non encore capitalisés
        
        for (let month = 1; month <= totalMonths; month++) {
            
            // --- 1. CALCUL DES INTÉRÊTS (Début de période) ---
            // L'argent déjà présent génère des intérêts pour ce mois-ci.
            // Note : On utilise le taux mensuel simple pour l'accumulation.
            const monthlyRate = annualInterestRate / 12;
            accumulatedInterest += balance * monthlyRate;
        
            // --- 2. CAPITALISATION (Est-ce le moment de verser les intérêts ?) ---
            // Ex: Si capitalisation annuelle (fréquence 1), on verse tous les 12 mois.
            const monthsPerCompounding = 12 / compoundFrequency;
            
            // On utilise Math.round pour éviter les bugs de float (ex: 2.99999)
            if (month % Math.round(monthsPerCompounding) === 0) {
                balance += accumulatedInterest;
                accumulatedInterest = 0; // On vide la salle d'attente
            }
        
            // --- 3. VERSEMENT (FIN DE PÉRIODE / Terme Échu) ---
            // Le versement arrive APRES le calcul des intérêts du mois (logique salaire).
            const monthsPerContribution = 12 / contributionFrequency;
            
            // Vérification : est-ce un mois de versement ?
            // On gère aussi le cas rare où on verse plus d'une fois par mois
            if (contributionFrequency >= 12) {
                // Cas standard (Mensuel ou moins fréquent)
                if (month % Math.round(monthsPerContribution) === 0) {
                    balance += currentContributionAmount;
                    totalContributions += currentContributionAmount;
                }
            } else {
                // Cas exotique (ex: Hebdomadaire simule sur base mensuelle)
                // On lisse le montant annuel sur 12 mois
                const monthlySmoothed = (currentContributionAmount * contributionFrequency) / 12;
                balance += monthlySmoothed;
                totalContributions += monthlySmoothed;
            }
        
            // --- 4. FIN D'ANNÉE (Sauvegarde & Augmentation) ---
            if (month % 12 === 0) {
                const currentYear = month / 12;
                
                // Pour le graphique, on affiche le Solde Réel + Intérêts latents
                const displayBalance = balance + accumulatedInterest;
                const totalInterest = displayBalance - totalContributions;
        
                yearlyData.push({
                    year: currentYear,
                    balance: displayBalance,
                    contributions: totalContributions,
                    interest: totalInterest
                });
        
                // Augmentation annuelle des versements (indexée sur l'année civile)
                if (annualContributionIncrease > 0) {
                    currentContributionAmount *= (1 + annualContributionIncrease);
                }
            }
        }
        
        // Calculs finaux
        const finalBalance = balance;
        const totalInterest = finalBalance - totalContributions;
        const taxOnInterest = totalInterest * taxRate;
        const afterTaxBalance = finalBalance - taxOnInterest;
        
        // Affichage des résultats
        totalInvestedSpan.textContent = formatCurrency(totalContributions);
        interestEarnedSpan.textContent = formatCurrency(totalInterest);
        finalValueSpan.textContent = formatCurrency(finalBalance);
        afterTaxValueSpan.textContent = formatCurrency(afterTaxBalance);
        
        resultsDiv.style.display = "block";
        createChart(yearlyData);
    }
    
    // =============================================
    // CALCUL DE L'OBJECTIF (ONGLET 2)
    // =============================================
    calculateObjectiveBtn.addEventListener("click", calculateRequiredContribution);
    
    function calculateRequiredContribution() {
        // Récupération des paramètres
        const targetAmount = parseFloat(targetAmountInput.value) || 0;
        const initialAmount = parseFloat(initialAmount2Input.value) || 0;
        const years = parseInt(targetYearsInput.value) || 0;
        const annualRate = parseFloat(targetInterestRateInput.value) / 100 || 0;
        const compoundFrequency = parseInt(compoundFrequency2Select.value) || 12;
        
        if (targetAmount <= 0 || years <= 0) {
            alert("Veuillez entrer un montant cible et une durée valides.");
            return;
        }
        
        // Calcul du montant nécessaire pour chaque fréquence de versement
        // Formule: PMT = (FV - PV * (1+r)^n) * r / ((1+r)^n - 1)
        // Où n est le nombre de périodes et r le taux par période
        
        const frequencies = [12, 4, 2, 1]; // Mensuel, Trimestriel, Semestriel, Annuel
        const results = {};
        
        frequencies.forEach(freq => {
            const result = calculatePMT(targetAmount, initialAmount, years, annualRate, compoundFrequency, freq);
            results[freq] = result;
        });
        
        // Affichage des résultats
        monthlyRequiredSpan.textContent = formatCurrency(results[12].payment);
        quarterlyRequiredSpan.textContent = formatCurrency(results[4].payment);
        semiAnnualRequiredSpan.textContent = formatCurrency(results[2].payment);
        annualRequiredSpan.textContent = formatCurrency(results[1].payment);
        
        // Calcul du total investi et des intérêts (basé sur les versements mensuels)
        const monthlyPayment = results[12].payment;
        const totalInvested = initialAmount + (monthlyPayment * 12 * years);
        const interestGenerated = targetAmount - totalInvested;
        
        totalToInvestSpan.textContent = formatCurrency(totalInvested);
        interestGeneratedSpan.textContent = formatCurrency(interestGenerated);
        
        resultsObjectiveDiv.style.display = "block";
        
        // Créer le graphique de projection
        createObjectiveChart(initialAmount, monthlyPayment, 12, annualRate, compoundFrequency, years, targetAmount);
    }
    
    /**
     * Calcule le versement périodique nécessaire (PMT) pour atteindre un objectif
     * en tenant compte de la fréquence de capitalisation et de versement
     */
    // =============================================
    // LOGIQUE DE CALCUL INVERSÉ (SOLVEUR)
    // =============================================

    /**
     * Fonction qui simule le futur capital (FV) avec les règles STRICTES du simulateur.
     * C'est le "jumeau" de votre fonction calculateCompoundInterest
     */
    function simulateFutureValue(initialAmount, monthlyContribution, years, annualRate, compoundFrequency) {
        let balance = initialAmount;
        let accumulatedInterest = 0;
        const totalMonths = years * 12;
        
        // On itère mois par mois comme dans le simulateur
        for (let month = 1; month <= totalMonths; month++) {
            // 1. Calcul des intérêts (accumulés en attente)
            // Taux mensuel simple
            const monthlyRate = annualRate / 12;
            accumulatedInterest += balance * monthlyRate;

            // 2. Capitalisation (Est-ce le moment de verser les intérêts ?)
            const monthsPerCompounding = 12 / compoundFrequency;
            if (month % Math.round(monthsPerCompounding) === 0) {
                balance += accumulatedInterest;
                accumulatedInterest = 0;
            }

            // 3. Versement (Fin de mois)
            // On ajoute le versement mensuel
            balance += monthlyContribution;
        }

        // On retourne le solde final + les intérêts qui traînent encore en salle d'attente
        return balance + accumulatedInterest;
    }

    /**
     * Calcule le versement mensuel nécessaire par DICHOTOMIE (Essais successifs)
     * Cela garantit que le résultat est 100% aligné avec le simulateur.
     */
    function solveForMonthlyContribution(targetAmount, initialAmount, years, annualRate, compoundFrequency) {
        let min = 0;
        let max = targetAmount; // Borne haute large
        let precision = 0.01; // On veut être précis au centime près
        let guess = max / 2;
        
        // On boucle jusqu'à trouver le bon montant (généralement < 20 itérations)
        for (let i = 0; i < 100; i++) {
            const simulatedResult = simulateFutureValue(initialAmount, guess, years, annualRate, compoundFrequency);
            
            if (Math.abs(simulatedResult - targetAmount) < precision) {
                return guess;
            }
            
            if (simulatedResult < targetAmount) {
                min = guess;
            } else {
                max = guess;
            }
            guess = (min + max) / 2;
        }
        return guess;
    }

    function calculateRequiredContribution() {
        // Récupération des paramètres
        const targetAmount = parseFloat(targetAmountInput.value) || 0;
        const initialAmount = parseFloat(initialAmount2Input.value) || 0;
        const years = parseInt(targetYearsInput.value) || 0;
        const annualRate = parseFloat(targetInterestRateInput.value) / 100 || 0;
        const compoundFrequency = parseInt(compoundFrequency2Select.value) || 12; // Mensuel par défaut, ou Annuel (1)

        if (targetAmount <= 0 || years <= 0) {
            alert("Veuillez entrer un montant cible et une durée valides.");
            return;
        }

        // 1. Trouver le versement MENSUEL de base via le Solveur
        const baseMonthlyPayment = solveForMonthlyContribution(targetAmount, initialAmount, years, annualRate, compoundFrequency);

        // 2. Extrapoler pour les autres fréquences (titre indicatif)
        // Note : Pour être puriste, on devrait lancer le solveur pour chaque fréquence, 
        // mais multiplier par 3, 6 ou 12 est suffisant pour l'affichage indicatif "combien ça fait par an".
        const results = {
            12: baseMonthlyPayment,
            4: baseMonthlyPayment * 3,
            2: baseMonthlyPayment * 6,
            1: baseMonthlyPayment * 12
        };

        // Affichage des résultats
        monthlyRequiredSpan.textContent = formatCurrency(results[12]);
        quarterlyRequiredSpan.textContent = formatCurrency(results[4]);
        semiAnnualRequiredSpan.textContent = formatCurrency(results[2]);
        annualRequiredSpan.textContent = formatCurrency(results[1]);

        // Calcul des totaux
        const totalInvested = initialAmount + (baseMonthlyPayment * 12 * years);
        const interestGenerated = targetAmount - totalInvested;

        totalToInvestSpan.textContent = formatCurrency(totalInvested);
        interestGeneratedSpan.textContent = formatCurrency(interestGenerated);

        resultsObjectiveDiv.style.display = "block";

        // Créer le graphique avec la logique stricte
        createObjectiveChart(initialAmount, baseMonthlyPayment, 12, annualRate, compoundFrequency, years, targetAmount);
    }

   
    
    // =============================================
    // CRÉATION DES GRAPHIQUES
    // =============================================
   function createChart(yearlyData) {
        if (chart) {
            chart.destroy();
        }
        
        const years = yearlyData.map(data => data.year);
        const balances = yearlyData.map(data => data.balance);
        const contributions = yearlyData.map(data => data.contributions);
        const interests = yearlyData.map(data => data.interest);
        
        const canvas = document.createElement('canvas');
        chartContainer.innerHTML = '';
        chartContainer.appendChild(canvas);
        
        const currencySymbol = currencies[activeCurrency].symbol;
        
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
    
     // =============================================
    // GRAPHIQUE OBJECTIF (LOGIQUE STRICTE)
    // =============================================
    function createObjectiveChart(initialAmount, monthlyPayment, contributionFrequency, annualRate, compoundFrequency, years, targetAmount) {
        if (chartObjective) {
            chartObjective.destroy();
        }

        const yearlyData = [{ year: 0, balance: initialAmount, contributions: initialAmount, interest: 0 }];
        
        let balance = initialAmount;
        let totalContributions = initialAmount;
        let accumulatedInterest = 0; // Salle d'attente
        
        const totalMonths = years * 12;

        for (let month = 1; month <= totalMonths; month++) {
            
            // --- 1. INTÉRÊTS ---
            const monthlyRate = annualRate / 12;
            accumulatedInterest += balance * monthlyRate;

            // --- 2. CAPITALISATION ---
            const monthsPerCompounding = 12 / compoundFrequency;
            if (month % Math.round(monthsPerCompounding) === 0) {
                balance += accumulatedInterest;
                accumulatedInterest = 0;
            }

            // --- 3. VERSEMENT (Fin de mois) ---
            balance += monthlyPayment;
            totalContributions += monthlyPayment;

            // --- 4. SAUVEGARDE (Fin d'année) ---
            if (month % 12 === 0) {
                const currentYear = month / 12;
                
                // Pour le graphique, on inclut visuellement les intérêts en attente
                // pour éviter l'effet "escalier" trop violent, ou on reste strict.
                // Restons stricts pour être cohérent avec le chiffre final.
                const displayBalance = balance + accumulatedInterest; 
                
                yearlyData.push({
                    year: currentYear,
                    balance: displayBalance,
                    contributions: totalContributions,
                    interest: displayBalance - totalContributions
                });
            }
        }

        // Préparation des données pour Chart.js
        const yearsLabels = yearlyData.map(data => data.year);
        const balancesData = yearlyData.map(data => data.balance);
        const contributionsData = yearlyData.map(data => data.contributions);
        const targetLine = yearlyData.map(() => targetAmount);

        const canvas = document.createElement('canvas');
        chartObjectiveContainer.innerHTML = '';
        chartObjectiveContainer.appendChild(canvas);

        const currencySymbol = currencies[activeCurrency].symbol;

        chartObjective = new Chart(canvas, {
            type: 'line',
            data: {
                labels: yearsLabels,
                datasets: [
                    {
                        label: 'Projection',
                        data: balancesData,
                        backgroundColor: 'rgba(52, 152, 219, 0.2)',
                        borderColor: 'rgba(52, 152, 219, 1)',
                        borderWidth: 2,
                        fill: true
                    },
                    {
                        label: 'Montants investis',
                        data: contributionsData,
                        backgroundColor: 'rgba(46, 204, 113, 0.2)',
                        borderColor: 'rgba(46, 204, 113, 1)',
                        borderWidth: 2,
                        fill: true
                    },
                    {
                        label: 'Objectif',
                        data: targetLine,
                        borderColor: 'rgba(231, 76, 60, 1)',
                        borderWidth: 2,
                        borderDash: [5, 5],
                        fill: false,
                        pointRadius: 0
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
                    x: { title: { display: true, text: 'Années' } },
                    y: {
                        title: { display: true, text: `Valeur (${currencySymbol})` },
                        ticks: { callback: function(value) { return formatCurrency(value, false); } }
                    }
                }
            }
        });
    }
    
    // =============================================
    // RÉINITIALISATION
    // =============================================
    resetBtn.addEventListener("click", function() {
        initialAmountInput.value = "1000";
        contributionAmountInput.value = "100";
        annualInterestRateInput.value = "5";
        investmentPeriodInput.value = "20";
        contributionFrequencySelect.value = "12";
        annualContributionIncreaseInput.value = "0";
        compoundFrequencySelect.value = "12";
        taxRateInput.value = "30";
        
        updateFrequencyDescription();
        resultsDiv.style.display = "none";
        
        if (chart) {
            chart.destroy();
            chart = null;
        }
    });
    
    resetObjectiveBtn.addEventListener("click", function() {
        targetAmountInput.value = "100000";
        initialAmount2Input.value = "0";
        targetYearsInput.value = "20";
        targetInterestRateInput.value = "5";
        compoundFrequency2Select.value = "12";
        
        resultsObjectiveDiv.style.display = "none";
        
        if (chartObjective) {
            chartObjective.destroy();
            chartObjective = null;
        }
    });
    
    // =============================================
    // FORMATAGE DES DEVISES
    // =============================================
    function formatCurrency(value, includeSymbol = true) {
        const currencyInfo = currencies[activeCurrency];
        const formatter = new Intl.NumberFormat(currencyInfo.locale, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
        
        return formatter.format(Math.round(value)) + (includeSymbol ? ` ${currencyInfo.symbol}` : '');
    }
    
    // =============================================
    // INITIALISATION
    // =============================================
    updateCurrencyLabels();
    updateFrequencyDescription();
});
