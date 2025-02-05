(() => {
    'use strict'
    
    const forms = document.querySelectorAll('.needs-validation')
    
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }
            
            form.classList.add('was-validated')
        }, false)
        
        // Add animation to form inputs
        const inputs = form.querySelectorAll('.form-control, .form-select')
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.closest('.input-group').style.transform = 'scale(1.02)'
            })
            
            input.addEventListener('blur', () => {
                input.closest('.input-group').style.transform = 'scale(1)'
            })
        })
    })
})()
