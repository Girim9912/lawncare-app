document.addEventListener('DOMContentLoaded', function() {
    const quoteCalculator = document.getElementById('quote-calculator');
    
    if (quoteCalculator) {
        const calculateBtn = document.getElementById('calculate-btn');
        const lawnSizeInput = document.getElementById('lawn-size');
        const serviceTypeSelect = document.getElementById('service-type');
        const quoteResult = document.getElementById('quote-result');
        const estimatedCost = document.getElementById('estimated-cost');
        
        calculateBtn.addEventListener('click', function() {
            const lawnSize = parseInt(lawnSizeInput.value);
            const serviceType = serviceTypeSelect.value;
            
            if (isNaN(lawnSize) {
                alert('Please enter a valid lawn size');
                return;
            }
            
            // Calculate cost based on service type and lawn size
            let costPerSqFt;
            
            switch(serviceType) {
                case 'mowing':
                    costPerSqFt = 0.03;
                    break;
                case 'fertilization':
                    costPerSqFt = 0.05;
                    break;
                case 'landscaping':
                    costPerSqFt = 0.10;
                    break;
                default:
                    costPerSqFt = 0.04;
            }
            
            // Minimum charge
            let totalCost = lawnSize * costPerSqFt;
            if (totalCost < 30) totalCost = 30;
            
            // Display result
            estimatedCost.textContent = '$' + totalCost.toFixed(2);
            quoteResult.style.display = 'block';
        });
    }
});