document.addEventListener("DOMContentLoaded", function() {
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
    const globalReturnSpan = document.getElementById("globalReturn");
    const toggleAdvancedBtn = document.getElementById("toggleAdvanced");
    const advancedOptionsDiv = document.getElementById("advancedOptions");
    const chartContainer = document.getElementById("chart");
    const frequencyDescription = document.getElementById("frequencyDescription");

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
    const globalReturnObjectiveSpan = document.getElementById("globalReturnObjective");

    const currencySelect = document.getElementById("currency");
    const tabBtns = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    const currencySymbols = [
        document.getElementById("initialAmountCurrencySymbol"),
        document.getElementById("contributionAmountCurrencySymbol"),
        document.getElementById("targetAmountCurrencySymbol"),
        document.getElementById("initialAmount2CurrencySymbol")
    ];

    let chart = null;
    let chartObjective = null;

    const currencies = {
        EUR: { symbol: "€", locale: "fr-FR" }, USD: { symbol: "$", locale: "en-US" },
        GBP: { symbol: "£", locale: "en-GB" }, JPY: { symbol: "¥", locale: "ja-JP" },
        CHF: { symbol: "CHF", locale: "de-CH" }, CAD: { symbol: "CAD", locale: "en-CA" },
        AUD: { symbol: "AUD", locale: "en-AU" }, XOF: { symbol: "FCFA", locale: "fr-FR" },
        XAF: { symbol: "FCFA", locale: "fr-FR" }, ZAR: { symbol: "ZAR", locale: "en-ZA" },
        NGN: { symbol: "₦", locale: "en-NG" }, EGP: { symbol: "E£", locale: "ar-EG" },
        GHS: { symbol: "GH₵", locale: "en-GH" }, KES: { symbol: "KSh", locale: "en-KE" },
        MAD: { symbol: "MAD", locale: "ar-MA" }, DZD: { symbol: "DZD", locale: "ar-DZ" },
        TND: { symbol: "TND", locale: "ar-TN" }, MUR: { symbol: "Rs", locale: "en-MU" },
        CVE: { symbol: "CVE", locale: "pt-CV" }, GMD: { symbol: "GMD", locale: "en-GM" },
        GNF: { symbol: "GNF", locale: "fr-GN" }, SLL: { symbol: "SLL", locale: "en-SL" },
        LRD: { symbol: "LRD", locale: "en-LR" }, ETB: { symbol: "ETB", locale: "am-ET" },
        DJF: { symbol: "DJF", locale: "fr-DJ" }, SOS: { symbol: "SOS", locale: "so-SO" },
        UGX: { symbol: "UGX", locale: "en-UG" }, TZS: { symbol: "TZS", locale: "en-TZ" },
        RWF: { symbol: "RWF", locale: "fr-RW" }, BIF: { symbol: "BIF", locale: "fr-BI" },
        MGA: { symbol: "MGA", locale: "fr-MG" }, MZN: { symbol: "MZN", locale: "pt-MZ" },
        ZMW: { symbol: "ZMW", locale: "en-ZM" }, BWP: { symbol: "BWP", locale: "en-BW" },
        NAD: { symbol: "NAD", locale: "en-NA" }, SZL: { symbol: "SZL", locale: "en-SZ" },
        LSL: { symbol: "LSL", locale: "en-LS" }, SCR: { symbol: "SCR", locale: "en-SC" },
        SDG: { symbol: "SDG", locale: "ar-SD" }, SSP: { symbol: "SSP", locale: "en-SS" },
        AOA: { symbol: "AOA", locale: "pt-AO" }, CDF: { symbol: "CDF", locale: "fr-CD" }
    };

    let activeCurrency = "EUR";

    tabBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            const tabId = this.getAttribute("data-tab");
            tabBtns.forEach(b => b.classList.remove("active"));
            tabContents.forEach(c => c.classList.remove("active"));
            this.classList.add("active");
            document.getElementById(tabId).classList.add("active");
        });
    });

    currencySelect.addEventListener("change", function() {
        activeCurrency = this.value;
        updateCurrencyLabels();
        updateFrequencyDescription();
    });

    function updateCurrencyLabels() {
        const currencySymbol = currencies[activeCurrency].symbol;
        currencySymbols.forEach(span => { if (span) span.textContent = currencySymbol; });
        if (chart) { chart.options.scales.y.title.text = i18n.t('chart_value') + ' (' + currencySymbol + ')'; chart.update(); }
        if (chartObjective) { chartObjective.options.scales.y.title.text = i18n.t('chart_value') + ' (' + currencySymbol + ')'; chartObjective.update(); }
    }

    function updateFrequencyDescription() {
        const amount = parseFloat(contributionAmountInput.value) || 0;
        const frequency = parseInt(contributionFrequencySelect.value) || 12;
        const annualAmount = amount * frequency;
        const freqLabel = i18n.t('freq_label_' + frequency);
        const plural = frequency > 1 ? 's' : '';
        const template = i18n.t('frequency_desc_template');
        frequencyDescription.textContent = template
            .replace('{amount}', formatCurrency(annualAmount))
            .replace('{count}', frequency)
            .replace('{freqLabel}', freqLabel)
            .replace(/\{plural\}/g, plural);
    }

    contributionAmountInput.addEventListener("input", updateFrequencyDescription);
    contributionFrequencySelect.addEventListener("change", updateFrequencyDescription);

    toggleAdvancedBtn.addEventListener("click", function() {
        if (advancedOptionsDiv.style.display === "none" || advancedOptionsDiv.style.display === "") {
            advancedOptionsDiv.style.display = "block";
            toggleAdvancedBtn.textContent = i18n.t('advanced_options_up');
        } else {
            advancedOptionsDiv.style.display = "none";
            toggleAdvancedBtn.textContent = i18n.t('advanced_options_down');
        }
    });

    toggleAdvanced2Btn.addEventListener("click", function() {
        if (advancedOptions2Div.style.display === "none" || advancedOptions2Div.style.display === "") {
            advancedOptions2Div.style.display = "block";
            toggleAdvanced2Btn.textContent = i18n.t('advanced_options_up');
        } else {
            advancedOptions2Div.style.display = "none";
            toggleAdvanced2Btn.textContent = i18n.t('advanced_options_down');
        }
    });

    calculateBtn.addEventListener("click", calculateCompoundInterest);

    function calculateCompoundInterest() {
        const initialAmount = parseFloat(initialAmountInput.value) || 0;
        const contributionAmount = parseFloat(contributionAmountInput.value) || 0;
        const annualInterestRate = parseFloat(annualInterestRateInput.value) / 100 || 0;
        const investmentPeriod = parseInt(investmentPeriodInput.value) || 0;
        const contributionFrequency = parseInt(contributionFrequencySelect.value) || 12;
        const annualContributionIncrease = parseFloat(annualContributionIncreaseInput.value) / 100 || 0;
        const compoundFrequency = parseInt(compoundFrequencySelect.value) || 12;
        const taxRate = parseFloat(taxRateInput.value) / 100 || 0;

        let currentContributionAmount = contributionAmount;
        let balance = initialAmount;
        let totalContributions = initialAmount;
        const yearlyData = [{ year: 0, balance: initialAmount, contributions: initialAmount, interest: 0 }];
        const totalMonths = investmentPeriod * 12;
        let accumulatedInterest = 0;

        for (let month = 1; month <= totalMonths; month++) {
            const monthlyRate = annualInterestRate / 12;
            accumulatedInterest += balance * monthlyRate;
            const monthsPerCompounding = 12 / compoundFrequency;
            if (month % Math.round(monthsPerCompounding) === 0) { balance += accumulatedInterest; accumulatedInterest = 0; }
            const monthsPerContribution = 12 / contributionFrequency;
            if (contributionFrequency >= 12) {
                if (month % Math.round(monthsPerContribution) === 0) { balance += currentContributionAmount; totalContributions += currentContributionAmount; }
            } else {
                const monthlySmoothed = (currentContributionAmount * contributionFrequency) / 12;
                balance += monthlySmoothed; totalContributions += monthlySmoothed;
            }
            if (month % 12 === 0) {
                const currentYear = month / 12;
                const displayBalance = balance + accumulatedInterest;
                const totalInterest = displayBalance - totalContributions;
                yearlyData.push({ year: currentYear, balance: displayBalance, contributions: totalContributions, interest: totalInterest });
                if (annualContributionIncrease > 0) { currentContributionAmount *= (1 + annualContributionIncrease); }
            }
        }

        const finalBalance = balance;
        const totalInterest = finalBalance - totalContributions;
        const taxOnInterest = totalInterest * taxRate;
        const afterTaxBalance = finalBalance - taxOnInterest;
        const globalReturn = totalContributions > 0 ? (totalInterest / totalContributions) * 100 : 0;

        totalInvestedSpan.textContent = formatCurrency(totalContributions);
        interestEarnedSpan.textContent = formatCurrency(totalInterest);
        finalValueSpan.textContent = formatCurrency(finalBalance);
        afterTaxValueSpan.textContent = formatCurrency(afterTaxBalance);
        globalReturnSpan.textContent = formatPercentage(globalReturn);
        resultsDiv.style.display = "block";
        createChart(yearlyData);
    }

    calculateObjectiveBtn.addEventListener("click", calculateRequiredContribution);

    function simulateFutureValue(initialAmount, monthlyContribution, years, annualRate, compoundFrequency) {
        let balance = initialAmount;
        let accumulatedInterest = 0;
        const totalMonths = years * 12;
        for (let month = 1; month <= totalMonths; month++) {
            const monthlyRate = annualRate / 12;
            accumulatedInterest += balance * monthlyRate;
            const monthsPerCompounding = 12 / compoundFrequency;
            if (month % Math.round(monthsPerCompounding) === 0) { balance += accumulatedInterest; accumulatedInterest = 0; }
            balance += monthlyContribution;
        }
        return balance + accumulatedInterest;
    }

    function solveForMonthlyContribution(targetAmount, initialAmount, years, annualRate, compoundFrequency) {
        let min = 0; let max = targetAmount; let precision = 0.01; let guess = max / 2;
        for (let i2 = 0; i2 < 100; i2++) {
            const simulatedResult = simulateFutureValue(initialAmount, guess, years, annualRate, compoundFrequency);
            if (Math.abs(simulatedResult - targetAmount) < precision) { return guess; }
            if (simulatedResult < targetAmount) { min = guess; } else { max = guess; }
            guess = (min + max) / 2;
        }
        return guess;
    }

    function calculateRequiredContribution() {
        const targetAmount = parseFloat(targetAmountInput.value) || 0;
        const initialAmount = parseFloat(initialAmount2Input.value) || 0;
        const years = parseInt(targetYearsInput.value) || 0;
        const annualRate = parseFloat(targetInterestRateInput.value) / 100 || 0;
        const compoundFrequency = parseInt(compoundFrequency2Select.value) || 12;
        if (targetAmount <= 0 || years <= 0) { alert(i18n.t('alert_invalid')); return; }
        const baseMonthlyPayment = solveForMonthlyContribution(targetAmount, initialAmount, years, annualRate, compoundFrequency);
        const results = { 12: baseMonthlyPayment, 4: baseMonthlyPayment * 3, 2: baseMonthlyPayment * 6, 1: baseMonthlyPayment * 12 };
        monthlyRequiredSpan.textContent = formatCurrency(results[12]);
        quarterlyRequiredSpan.textContent = formatCurrency(results[4]);
        semiAnnualRequiredSpan.textContent = formatCurrency(results[2]);
        annualRequiredSpan.textContent = formatCurrency(results[1]);
        const totalInvested = initialAmount + (baseMonthlyPayment * 12 * years);
        const interestGenerated = targetAmount - totalInvested;
        const globalReturn = totalInvested > 0 ? (interestGenerated / totalInvested) * 100 : 0;
        totalToInvestSpan.textContent = formatCurrency(totalInvested);
        interestGeneratedSpan.textContent = formatCurrency(interestGenerated);
        globalReturnObjectiveSpan.textContent = formatPercentage(globalReturn);
        resultsObjectiveDiv.style.display = "block";
        createObjectiveChart(initialAmount, baseMonthlyPayment, 12, annualRate, compoundFrequency, years, targetAmount);
    }

    function createChart(yearlyData) {
        if (chart) { chart.destroy(); }
        const years = yearlyData.map(data => data.year);
        const balances = yearlyData.map(data => data.balance);
        const contributions = yearlyData.map(data => data.contributions);
        const interests = yearlyData.map(data => data.interest);
        const canvas = document.createElement('canvas');
        chartContainer.innerHTML = ''; chartContainer.appendChild(canvas);
        const currencySymbol = currencies[activeCurrency].symbol;
        chart = new Chart(canvas, {
            type: 'line',
            data: {
                labels: years,
                datasets: [
                    { label: i18n.t('chart_total_value'), data: balances, backgroundColor: 'rgba(52, 152, 219, 0.2)', borderColor: 'rgba(52, 152, 219, 1)', borderWidth: 2, fill: true },
                    { label: i18n.t('chart_invested'), data: contributions, backgroundColor: 'rgba(46, 204, 113, 0.2)', borderColor: 'rgba(46, 204, 113, 1)', borderWidth: 2, fill: true },
                    { label: i18n.t('chart_interest'), data: interests, backgroundColor: 'rgba(155, 89, 182, 0.2)', borderColor: 'rgba(155, 89, 182, 1)', borderWidth: 2, fill: true }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { tooltip: { callbacks: { label: function(context) { return context.dataset.label + ': ' + formatCurrency(context.raw); } } } },
                scales: {
                    x: { title: { display: true, text: i18n.t('chart_years') } },
                    y: { title: { display: true, text: i18n.t('chart_value') + ' (' + currencySymbol + ')' }, ticks: { callback: function(value) { return formatCurrency(value, false); } } }
                }
            }
        });
    }

    function createObjectiveChart(initialAmount, monthlyPayment, contributionFrequency, annualRate, compoundFrequency, years, targetAmount) {
        if (chartObjective) { chartObjective.destroy(); }
        const yearlyData = [{ year: 0, balance: initialAmount, contributions: initialAmount, interest: 0 }];
        let balance = initialAmount; let totalContributions = initialAmount; let accumulatedInterest = 0;
        const totalMonths = years * 12;
        for (let month = 1; month <= totalMonths; month++) {
            const monthlyRate = annualRate / 12;
            accumulatedInterest += balance * monthlyRate;
            const monthsPerCompounding = 12 / compoundFrequency;
            if (month % Math.round(monthsPerCompounding) === 0) { balance += accumulatedInterest; accumulatedInterest = 0; }
            balance += monthlyPayment; totalContributions += monthlyPayment;
            if (month % 12 === 0) {
                const currentYear = month / 12;
                const displayBalance = balance + accumulatedInterest;
                yearlyData.push({ year: currentYear, balance: displayBalance, contributions: totalContributions, interest: displayBalance - totalContributions });
            }
        }
        const yearsLabels = yearlyData.map(data => data.year);
        const balancesData = yearlyData.map(data => data.balance);
        const contributionsData = yearlyData.map(data => data.contributions);
        const targetLine = yearlyData.map(() => targetAmount);
        const canvas = document.createElement('canvas');
        chartObjectiveContainer.innerHTML = ''; chartObjectiveContainer.appendChild(canvas);
        const currencySymbol = currencies[activeCurrency].symbol;
        chartObjective = new Chart(canvas, {
            type: 'line',
            data: {
                labels: yearsLabels,
                datasets: [
                    { label: i18n.t('chart_projection'), data: balancesData, backgroundColor: 'rgba(52, 152, 219, 0.2)', borderColor: 'rgba(52, 152, 219, 1)', borderWidth: 2, fill: true },
                    { label: i18n.t('chart_invested'), data: contributionsData, backgroundColor: 'rgba(46, 204, 113, 0.2)', borderColor: 'rgba(46, 204, 113, 1)', borderWidth: 2, fill: true },
                    { label: i18n.t('chart_target'), data: targetLine, borderColor: 'rgba(231, 76, 60, 1)', borderWidth: 2, borderDash: [5, 5], fill: false, pointRadius: 0 }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { tooltip: { callbacks: { label: function(context) { return context.dataset.label + ': ' + formatCurrency(context.raw); } } } },
                scales: {
                    x: { title: { display: true, text: i18n.t('chart_years') } },
                    y: { title: { display: true, text: i18n.t('chart_value') + ' (' + currencySymbol + ')' }, ticks: { callback: function(value) { return formatCurrency(value, false); } } }
                }
            }
        });
    }

    resetBtn.addEventListener("click", function() {
        initialAmountInput.value = "1000"; contributionAmountInput.value = "100";
        annualInterestRateInput.value = "5"; investmentPeriodInput.value = "20";
        contributionFrequencySelect.value = "12"; annualContributionIncreaseInput.value = "0";
        compoundFrequencySelect.value = "12"; taxRateInput.value = "30";
        updateFrequencyDescription(); resultsDiv.style.display = "none";
        if (chart) { chart.destroy(); chart = null; }
    });

    resetObjectiveBtn.addEventListener("click", function() {
        targetAmountInput.value = "100000"; initialAmount2Input.value = "0";
        targetYearsInput.value = "20"; targetInterestRateInput.value = "5";
        compoundFrequency2Select.value = "12";
        resultsObjectiveDiv.style.display = "none";
        if (chartObjective) { chartObjective.destroy(); chartObjective = null; }
    });

    function formatCurrency(value, includeSymbol) {
        if (includeSymbol === undefined) includeSymbol = true;
        const currencyInfo = currencies[activeCurrency];
        const formatter = new Intl.NumberFormat(currencyInfo.locale, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
        return formatter.format(Math.round(value)) + (includeSymbol ? ' ' + currencyInfo.symbol : '');
    }

    function formatPercentage(value) {
        const sep = i18n.currentLang === 'fr' ? ',' : '.';
        return value.toFixed(2).replace('.', sep) + ' %';
    }

    window.onLanguageChanged = function() {
        updateFrequencyDescription();
        if (advancedOptionsDiv.style.display === "block") { toggleAdvancedBtn.textContent = i18n.t('advanced_options_up'); }
        else { toggleAdvancedBtn.textContent = i18n.t('advanced_options_down'); }
        if (advancedOptions2Div.style.display === "block") { toggleAdvanced2Btn.textContent = i18n.t('advanced_options_up'); }
        else { toggleAdvanced2Btn.textContent = i18n.t('advanced_options_down'); }
        if (chart) { calculateCompoundInterest(); }
        if (chartObjective) { calculateRequiredContribution(); }
    };

    updateCurrencyLabels();
    updateFrequencyDescription();
});