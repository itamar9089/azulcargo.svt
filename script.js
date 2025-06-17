// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToContact() {
    scrollToSection('contato');
}

function scrollToCalculator() {
    scrollToSection('contato');
}

// WhatsApp integration
function openWhatsApp(service = '') {
    const phoneNumber = '5511999999999'; // Replace with actual WhatsApp number
    let message = 'Olá! Gostaria de solicitar uma cotação para transporte aéreo de carga.';
    
    if (service) {
        message += ` Tenho interesse no serviço: ${service}.`;
    }
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Send form data via WhatsApp
function sendWhatsAppForm() {
    const form = document.getElementById('contactForm');
    const formData = new FormData(form);
    
    // Validate required fields
    const requiredFields = ['empresa', 'responsavel', 'telefone', 'email', 'tipoCarga', 'volumeMensal'];
    let isValid = true;
    
    requiredFields.forEach(field => {
        const input = form.querySelector(`[name="${field}"]`);
        if (!input.value.trim()) {
            input.style.borderColor = '#EF4444';
            isValid = false;
        } else {
            input.style.borderColor = '#E5E7EB';
        }
    });
    
    if (!isValid) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Build WhatsApp message
    let message = '🚀 *SOLICITAÇÃO DE COTAÇÃO - AZUL CARGO EXPRESS*\n\n';
    message += `📋 *Dados da Empresa:*\n`;
    message += `• Empresa: ${formData.get('empresa')}\n`;
    message += `• Responsável: ${formData.get('responsavel')}\n`;
    message += `• Telefone: ${formData.get('telefone')}\n`;
    message += `• E-mail: ${formData.get('email')}\n\n`;
    
    message += `📦 *Informações da Carga:*\n`;
    message += `• Tipo de Carga: ${formData.get('tipoCarga')}\n`;
    message += `• Volume Mensal: ${formData.get('volumeMensal')}\n`;
    
    if (formData.get('destinos')) {
        message += `• Principais Destinos: ${formData.get('destinos')}\n`;
    }
    
    if (formData.get('observacoes')) {
        message += `\n💬 *Observações:*\n${formData.get('observacoes')}\n`;
    }
    
    message += '\n✅ Aguardo retorno para cotação personalizada!';
    
    const phoneNumber = '5511999999999'; // Replace with actual WhatsApp number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Form submission handler
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Here you would typically send the form data to your server
    // For now, we'll show a success message
    alert('Obrigado! Entraremos em contato em até 2 horas.');
    
    // Reset form
    this.reset();
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    const animatedElements = document.querySelectorAll('.service-card, .advantage-card, .audience-card, .section-header');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Phone number formatting
function formatPhone(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.length >= 11) {
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (value.length >= 7) {
        value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else if (value.length >= 3) {
        value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    }
    
    input.value = value;
}

// Add phone formatting to phone input
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('telefone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            formatPhone(this);
        });
    }
});

// Smooth reveal animations for stats
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const finalValue = stat.textContent;
        const isPercentage = finalValue.includes('%');
        const isPlus = finalValue.includes('+');
        const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
        
        let currentValue = 0;
        const increment = numericValue / 50;
        
        const timer = setInterval(() => {
            currentValue += increment;
            
            if (currentValue >= numericValue) {
                currentValue = numericValue;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(currentValue);
            
            if (finalValue.includes('.')) {
                displayValue = (currentValue / 10).toFixed(1);
            }
            
            if (isPercentage) {
                displayValue += '%';
            } else if (isPlus) {
                displayValue += '+';
            } else if (finalValue.includes('/')) {
                displayValue = finalValue; // Keep 24/7 as is
            }
            
            stat.textContent = displayValue;
        }, 50);
    });
}

// Trigger stats animation when hero section is visible
const heroObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(animateStats, 1000);
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Utility functions for better UX
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: #10B981;' : 'background: #EF4444;'}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Enhanced form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    return re.test(phone);
}

// Add real-time validation
document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('telefone');
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                this.style.borderColor = '#EF4444';
                showNotification('Por favor, insira um e-mail válido.', 'error');
            } else {
                this.style.borderColor = '#E5E7EB';
            }
        });
    }
    
    if (phoneInput) {
        phoneInput.addEventListener('blur', function() {
            if (this.value && !validatePhone(this.value)) {
                this.style.borderColor = '#EF4444';
                showNotification('Por favor, insira um telefone válido.', 'error');
            } else {
                this.style.borderColor = '#E5E7EB';
            }
        });
    }
});

