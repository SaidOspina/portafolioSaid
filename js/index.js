// Configuración global
const CONFIG = {
    particleCount: 50,
    musicVolume: 0.15,
    animationDelay: 100,
    scrollOffset: 100,
    // Configuración de EmailJS
    emailJS: {
        serviceID: "service_8dq6atk",
        templateID: "template_7m02u1c",
        userID: "zIeqBcQvqDWK7b_66"
    }
};

// Variables globales
let isMenuOpen = false;
let isMusicPlaying = true;
let animatedElements = new Set();

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    initializeEmailJS();
    initializeParticles();
    initializeNavigation();
    initializeMusic();
    initializeAnimations();
    initializeSkillBars();
    initializeContactForm();
    initializeSmoothScroll();
    initializeGitHubLinks();
    initializeCVDownload();
});

// Inicializar EmailJS
function initializeEmailJS() {
    try {
        emailjs.init(CONFIG.emailJS.userID);
        console.log('✅ EmailJS inicializado correctamente');
    } catch (error) {
        console.error('❌ Error inicializando EmailJS:', error);
        showNotification('Error al inicializar el servicio de correo', 'error');
    }
}

// Sistema de partículas de fondo
function initializeParticles() {
    const particlesContainer = document.querySelector('.bg-particles');
    
    for (let i = 0; i < CONFIG.particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Posición aleatoria
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Animación con delay aleatorio
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (4 + Math.random() * 4) + 's';
    
    container.appendChild(particle);
    
    // Recrear partícula después de que termine la animación
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
            createParticle(container);
        }
    }, (4 + Math.random() * 4) * 1000);
}

// Sistema de navegación
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');
    const header = document.querySelector('header');

    // Toggle menú móvil
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    // Cerrar menú al hacer click en un enlace
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                toggleMenu();
            }
        });
    });

    // Efecto de scroll en header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 102, 255, 0.2)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Resaltar sección activa en navegación
    highlightActiveSection();
}

function toggleMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    isMenuOpen = !isMenuOpen;
    navLinks.classList.toggle('active');
    
    // Animación del icono hamburger
    const spans = hamburger.querySelectorAll('span');
    if (isMenuOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - CONFIG.scrollOffset;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Sistema de música de fondo
function initializeMusic() {
    const audio = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    const musicIcon = musicToggle.querySelector('i');

    if (audio) {
        audio.volume = CONFIG.musicVolume;
        
        // Intentar reproducir automáticamente
        audio.play().then(() => {
            isMusicPlaying = true;
            updateMusicIcon(musicIcon, true);
        }).catch(() => {
            // Si falla la reproducción automática, esperar interacción del usuario
            isMusicPlaying = false;
            updateMusicIcon(musicIcon, false);
        });

        // Control manual de música
        musicToggle.addEventListener('click', () => {
            if (isMusicPlaying) {
                audio.pause();
                isMusicPlaying = false;
                musicToggle.classList.add('muted');
            } else {
                audio.play();
                isMusicPlaying = true;
                musicToggle.classList.remove('muted');
            }
            updateMusicIcon(musicIcon, isMusicPlaying);
        });
    }
}

function updateMusicIcon(icon, isPlaying) {
    icon.className = isPlaying ? 'fas fa-volume-up' : 'fas fa-volume-mute';
}

// Sistema de animaciones
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animatedElements.has(entry.target)) {
                animateElement(entry.target);
                animatedElements.add(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos para animación
    const elementsToAnimate = document.querySelectorAll('.skill-category, .project-card, .github-card, .stat, .timeline-item, .education-card, .certification-card, .language-card');
    elementsToAnimate.forEach(el => observer.observe(el));
}

function animateElement(element) {
    if (element.classList.contains('skill-category')) {
        element.style.animation = 'fadeInUp 0.8s ease-out';
    } else if (element.classList.contains('project-card')) {
        element.style.animation = 'fadeInUp 0.8s ease-out';
    } else if (element.classList.contains('github-card')) {
        element.style.animation = 'fadeInLeft 0.8s ease-out';
    } else if (element.classList.contains('stat')) {
        element.style.animation = 'fadeInUp 0.8s ease-out';
        animateCounter(element);
    } else if (element.classList.contains('timeline-item')) {
        element.style.animation = 'fadeInUp 0.8s ease-out';
    } else if (element.classList.contains('education-card')) {
        element.style.animation = 'fadeInRight 0.8s ease-out';
    } else if (element.classList.contains('certification-card')) {
        element.style.animation = 'fadeInUp 0.6s ease-out';
    } else if (element.classList.contains('language-card')) {
        element.style.animation = 'fadeInLeft 0.6s ease-out';
        animateLanguageBar(element);
    }
}

function animateCounter(statElement) {
    const countElement = statElement.querySelector('h3');
    const finalCount = parseInt(countElement.textContent);
    let currentCount = 0;
    const increment = finalCount / 50;
    const timer = setInterval(() => {
        currentCount += increment;
        if (currentCount >= finalCount) {
            countElement.textContent = finalCount + '+';
            clearInterval(timer);
        } else {
            countElement.textContent = Math.floor(currentCount);
        }
    }, 40);
}

function animateLanguageBar(languageCard) {
    const progressBar = languageCard.querySelector('.language-progress');
    if (progressBar) {
        const targetWidth = progressBar.style.width;
        progressBar.style.width = '0%';
        
        setTimeout(() => {
            progressBar.style.width = targetWidth;
        }, CONFIG.animationDelay);
    }
}

// Sistema de barras de habilidades
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                
                setTimeout(() => {
                    skillBar.style.width = width;
                }, CONFIG.animationDelay);
                
                observer.unobserve(skillBar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
}

// Sistema de formulario de contacto con EmailJS
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmission);
        
        // Validación en tiempo real
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Validar formulario
    if (!validateForm(data)) {
        showNotification('Por favor, completa todos los campos requeridos.', 'error');
        return;
    }

    // Mostrar estado de carga y enviar email
    showLoadingState(true);
    sendEmailWithEmailJS(data);
}

function validateForm(data) {
    const requiredFields = ['nombre', 'rol', 'email', 'mensaje'];
    return requiredFields.every(field => data[field] && data[field].trim() !== '');
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'Este campo es requerido');
        return false;
    }
    
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, 'Por favor, ingresa un email válido');
        return false;
    }
    
    clearFieldError(field);
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ff4444';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '0.5rem';
    
    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = '#ff4444';
}

function clearFieldError(field) {
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
    field.style.borderColor = 'rgba(0, 102, 255, 0.3)';
}

// Función principal para enviar email con EmailJS
function sendEmailWithEmailJS(data) {
    // Preparar los parámetros del template
    const templateParams = {
        from_name: data.nombre,
        from_email: data.email,
        from_role: data.rol,
        from_company: data.empresa || 'No especificada',
        from_phone: data.telefono || 'No especificado',
        message: data.mensaje,
        to_email: 'deislersaid1418@gmail.com',
        reply_to: data.email
    };

    // Enviar email usando EmailJS
    emailjs.send(
        CONFIG.emailJS.serviceID,
        CONFIG.emailJS.templateID,
        templateParams
    )
    .then(function(response) {
        console.log('✅ Email enviado exitosamente:', response.status, response.text);
        showLoadingState(false);
        showNotification('¡Mensaje enviado exitosamente! Te contactaré pronto.', 'success');
        
        // Limpiar formulario después del envío exitoso
        document.getElementById('contactForm').reset();
        
        // Trackear evento de envío exitoso
        trackEvent('form_submit_success', 'Contact', 'EmailJS');
        
    }, function(error) {
        console.error('❌ Error enviando email:', error);
        showLoadingState(false);
        
        // Mostrar error específico basado en el código
        let errorMessage = 'Error al enviar el mensaje. ';
        
        if (error.status === 400) {
            errorMessage += 'Datos del formulario inválidos.';
        } else if (error.status === 401) {
            errorMessage += 'Error de autenticación del servicio.';
        } else if (error.status === 402) {
            errorMessage += 'Límite de emails alcanzado.';
        } else if (error.status === 404) {
            errorMessage += 'Servicio no encontrado.';
        } else if (error.status >= 500) {
            errorMessage += 'Error del servidor. Intenta más tarde.';
        } else {
            errorMessage += 'Por favor, intenta nuevamente.';
        }
        
        showNotification(errorMessage, 'error');
        
        // Trackear evento de error
        trackEvent('form_submit_error', 'Contact', `Error_${error.status}`);
    });
}

function showLoadingState(isLoading) {
    const submitButton = document.querySelector('.contact-form button[type="submit"]');
    const buttonIcon = submitButton.querySelector('i');
    const buttonText = buttonIcon.nextSibling;
    
    if (isLoading) {
        submitButton.disabled = true;
        submitButton.style.opacity = '0.7';
        submitButton.style.cursor = 'not-allowed';
        buttonIcon.className = 'fas fa-spinner fa-spin';
        buttonText.textContent = ' Enviando...';
    } else {
        submitButton.disabled = false;
        submitButton.style.opacity = '1';
        submitButton.style.cursor = 'pointer';
        buttonIcon.className = 'fas fa-paper-plane';
        buttonText.textContent = ' Enviar Mensaje';
    }
}

function showNotification(message, type = 'info') {
    // Remover notificación existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Estilos de la notificación
    Object.assign(notification.style, {
        position: 'fixed',
        top: '2rem',
        right: '2rem',
        padding: '1rem 1.5rem',
        borderRadius: '10px',
        color: 'white',
        fontWeight: '500',
        zIndex: '9999',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '350px',
        wordWrap: 'break-word',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        fontSize: '0.9rem',
        lineHeight: '1.4'
    });
    
    // Colores según el tipo
    if (type === 'success') {
        notification.style.background = 'linear-gradient(45deg, #00ff88, #00cc6a)';
        notification.innerHTML = `<i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>${message}`;
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(45deg, #ff4444, #cc3333)';
        notification.innerHTML = `<i class="fas fa-exclamation-circle" style="margin-right: 0.5rem;"></i>${message}`;
    } else {
        notification.style.background = 'linear-gradient(45deg, #0066ff, #004499)';
        notification.innerHTML = `<i class="fas fa-info-circle" style="margin-right: 0.5rem;"></i>${message}`;
    }
    
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 5 segundos (8 segundos para errores)
    const duration = type === 'error' ? 8000 : 5000;
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, duration);
}

// Sistema de scroll suave
function initializeSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Altura del header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Sistema de enlaces de GitHub
function initializeGitHubLinks() {
    const githubMainLink = document.getElementById('githubLink');
    const githubProjectLinks = document.querySelectorAll('.github-link');
    
    // Hacer los enlaces de GitHub interactivos
    if (githubMainLink) {
        githubMainLink.addEventListener('mouseenter', () => {
            githubMainLink.style.transform = 'scale(1.2) rotate(360deg)';
        });
        
        githubMainLink.addEventListener('mouseleave', () => {
            githubMainLink.style.transform = 'scale(1) rotate(0deg)';
        });
    }
    
    // Añadir efectos a los enlaces de proyectos
    githubProjectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Efecto de click
            link.style.transform = 'scale(0.9)';
            setTimeout(() => {
                link.style.transform = 'scale(1.2)';
            }, 100);
        });
    });
}

// Sistema de descarga de CV
function initializeCVDownload() {
    const downloadButton = document.getElementById('downloadCV');
    
    if (downloadButton) {
        downloadButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Efecto visual del botón
            downloadButton.style.transform = 'scale(0.95)';
            setTimeout(() => {
                downloadButton.style.transform = 'scale(1)';
            }, 150);
            
            // Simular descarga (reemplazar con la ruta real del CV)
            const cvUrl = 'documents/CV-Deisler-Said.pdf';
            
            // Crear enlace temporal para descarga
            const tempLink = document.createElement('a');
            tempLink.href = cvUrl;
            tempLink.download = 'CV-Deisler-Said.pdf';
            tempLink.style.display = 'none';
            
            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);
            
            // Mostrar notificación
            showNotification('Descargando CV...', 'info');
        });
    }
}

// Funciones de utilidad
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimización de scroll
const optimizedScrollHandler = throttle(() => {
    // Manejar efectos de scroll aquí si es necesario
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Manejo de redimensionamiento de ventana
const optimizedResizeHandler = debounce(() => {
    // Recalcular dimensiones si es necesario
    if (window.innerWidth > 768 && isMenuOpen) {
        toggleMenu(); // Cerrar menú móvil si se redimensiona a desktop
    }
}, 250);

window.addEventListener('resize', optimizedResizeHandler);

// Manejo de teclas
document.addEventListener('keydown', (e) => {
    // Escape para cerrar menú móvil
    if (e.key === 'Escape' && isMenuOpen) {
        toggleMenu();
    }
    
    // Espacio para pausar/reanudar música
    if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const musicToggle = document.getElementById('musicToggle');
        if (musicToggle) {
            musicToggle.click();
        }
    }
});

// Preloader (opcional)
function initializePreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="preloader-logo">
                <i class="fas fa-code"></i>
            </div>
            <div class="preloader-text">Cargando...</div>
        </div>
    `;
    
    // Estilos del preloader
    Object.assign(preloader.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #333333 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '9999',
        transition: 'opacity 0.5s ease'
    });
    
    document.body.appendChild(preloader);
    
    // Remover preloader cuando todo esté cargado
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                if (preloader.parentNode) {
                    preloader.remove();
                }
            }, 500);
        }, 1000);
    });
}

// Inicializar preloader si se desea
// initializePreloader();

// Manejo de errores globales
window.addEventListener('error', (e) => {
    console.error('Error en la aplicación:', e.error);
    // Aquí podrías enviar el error a un servicio de logging
});

// Manejo de promesas rechazadas
window.addEventListener('unhandledrejection', (e) => {
    console.error('Promesa rechazada no manejada:', e.reason);
    e.preventDefault();
});

// Funciones de analíticas (opcional)
function trackEvent(action, category = 'Portfolio', label = '') {
    // Integración con Google Analytics o similar
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
    
    // Log para desarrollo
    console.log(`📊 Event tracked: ${category} - ${action} - ${label}`);
}

// Trackear interacciones importantes
document.addEventListener('click', (e) => {
    if (e.target.matches('.btn-primary')) {
        trackEvent('click', 'Button', 'Primary CTA');
    } else if (e.target.matches('.social-link')) {
        trackEvent('click', 'Social', e.target.href);
    } else if (e.target.matches('.project-link')) {
        trackEvent('click', 'Project', 'View Project');
    }
});

// Lazy loading para imágenes (opcional)
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Función para testear la configuración de EmailJS
function testEmailJSConnection() {
    const testParams = {
        from_name: 'Test User',
        from_email: 'test@example.com',
        from_role: 'Tester',
        from_company: 'Test Company',
        from_phone: '123-456-7890',
        message: 'Este es un mensaje de prueba para verificar la configuración de EmailJS.',
        to_email: 'deislersaid1418@gmail.com',
        reply_to: 'test@example.com'
    };

    console.log('🧪 Iniciando prueba de EmailJS...');
    
    emailjs.send(
        CONFIG.emailJS.serviceID,
        CONFIG.emailJS.templateID,
        testParams
    )
    .then(function(response) {
        console.log('✅ Test EmailJS exitoso:', response.status, response.text);
        showNotification('Configuración de EmailJS verificada correctamente', 'success');
    })
    .catch(function(error) {
        console.error('❌ Test EmailJS falló:', error);
        showNotification('Error en la configuración de EmailJS', 'error');
    });
}

// Función para verificar el estado de EmailJS
function checkEmailJSStatus() {
    if (typeof emailjs === 'undefined') {
        console.error('❌ EmailJS no está cargado');
        showNotification('Error: Servicio de email no disponible', 'error');
        return false;
    }
    
    if (!CONFIG.emailJS.serviceID || !CONFIG.emailJS.templateID || !CONFIG.emailJS.userID) {
        console.error('❌ Configuración de EmailJS incompleta');
        showNotification('Error: Configuración de email incompleta', 'error');
        return false;
    }
    
    console.log('✅ EmailJS configurado correctamente');
    return true;
}

// Verificar estado al cargar
window.addEventListener('load', () => {
    setTimeout(() => {
        checkEmailJSStatus();
    }, 1000);
});

// Funciones de desarrollo (solo para testing)
function enableDevMode() {
    // Agregar botón de test en modo desarrollo
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const testButton = document.createElement('button');
        testButton.textContent = '🧪 Test EmailJS';
        testButton.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 20px;
            padding: 10px 15px;
            background: #ff6b6b;
            color: white;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            z-index: 9999;
            font-size: 12px;
            font-weight: bold;
        `;
        testButton.addEventListener('click', testEmailJSConnection);
        document.body.appendChild(testButton);
        
        console.log('🔧 Modo desarrollo activado');
    }
}

// Activar modo desarrollo si es necesario
enableDevMode();

// Exportar funciones para uso externo si es necesario
window.PortfolioApp = {
    showNotification,
    trackEvent,
    toggleMenu,
    testEmailJSConnection,
    checkEmailJSStatus,
    CONFIG
};

console.log('🚀 Portafolio de Deisler Said cargado correctamente');
console.log('🎵 Música de fondo:', isMusicPlaying ? 'Activada' : 'Desactivada');
console.log('📱 Dispositivo:', window.innerWidth <= 768 ? 'Móvil' : 'Desktop');
console.log('📧 EmailJS:', typeof emailjs !== 'undefined' ? 'Cargado' : 'No disponible');