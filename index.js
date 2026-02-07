/* // Typewriter
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;
    if (this.isDeleting) delta /= 2;

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function(){ that.tick(); }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) new TxtType(elements[i], JSON.parse(toRotate), period);
    }
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);

    const allCards = document.querySelectorAll(".card-inner");
    allCards.forEach(card => {
        setInterval(() => {
            card.classList.toggle("flipped");
        }, 3000);
    });

};

// Smooth scroll + show section
document.querySelectorAll('.btn, .nav-item a').forEach(link => {
    link.addEventListener('click', function(e){
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if(targetSection){
            const index = Array.from(sections).indexOf(targetSection);
            if(index !== -1){
                showSection(index); // يجعل السكشن مستهدف نشط
                // يظهر العناصر المتتابعة تدريجيًا
                const items = sections[currentSection].querySelectorAll(".item, .chart-section");
                items.forEach((el, i) => {
                    setTimeout(() => {
                        el.classList.add("show");
                        const bar = el.querySelector(".skill-bar");
                        const wrapper = el.querySelector(".skill-bar-wrapper");
                        if(bar && wrapper){
                            wrapper.classList.add("visible");
                            bar.style.width = bar.dataset.progress;
                        }
                    }, i * 200); // تأخير متتابع
                });
            }
        }
    });
});


// Section scroll animation
const sections = document.querySelectorAll(".section");
let currentSection = 0;
let currentItem = 0;
let isScrolling = false;
const delay = 600;

// ====== Charts (إنشاء عند الطلب) ======
let chartsCreated = false;

function createCharts() {
  if (chartsCreated) return;
  chartsCreated = true;

  // خيط توهج (plugin) لتطبيق shadow/glow على الرسم
  const glowPlugin = {
    id: 'glowPlugin',
    beforeDatasetDraw(chart, args, options) {
      const ctx = chart.ctx;
      ctx.save();
      ctx.shadowBlur = 20;
      // لون التوهج يتناسب مع الألوان الزاهية
      ctx.shadowColor = 'rgba(76,201,240,0.28)';
    },
    afterDatasetDraw(chart) {
      chart.ctx.restore();
    }
  };

  // ===== Doughnut Chart =====
  const doughnutEl = document.getElementById('skillsDoughnut');
  if (doughnutEl) {
    const doughnutCtx = doughnutEl.getContext('2d');
    new Chart(doughnutCtx, {
      type: 'doughnut',
      data: {
        labels: ['HTML','CSS','JS','TS','Git','GitHub','React','Node','SQL'],
        datasets: [{
          data: [90,85,80,75,70,85,80,75,70],
          backgroundColor: [
            'rgba(255,99,132,0.95)',
            'rgba(54,162,235,0.95)',
            'rgba(255,206,86,0.95)',
            'rgba(75,192,192,0.95)',
            'rgba(153,102,255,0.95)',
            'rgba(255,159,64,0.95)',
            'rgba(0,230,118,0.95)',
            'rgba(240,50,230,0.95)',
            'rgba(250,190,190,0.95)'
          ],
          borderColor: 'rgba(255,255,255,0.95)',
          borderWidth: 2,
          hoverOffset: 18
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          animateScale: true,
          animateRotate: true,
          duration: 1600
        },
        plugins: {
          legend: { labels: { color: '#fff', font: { size: 13 } }, position: 'bottom' }
        }
      },
      plugins: [glowPlugin]
    });
  }

  // ===== Bar Chart =====
  const barEl = document.getElementById('skillsBar');
  if (barEl) {
    const barCtx = barEl.getContext('2d');
    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: ['HTML','CSS','JS','TS','Git','GitHub','React','Node','SQL'],
        datasets: [{
          label: 'Skill Level',
          data: [90,85,80,75,70,85,80,75,70],
          backgroundColor: [
            'rgba(76,201,240,0.95)',
            'rgba(76,201,240,0.85)',
            'rgba(76,201,240,0.8)',
            'rgba(76,201,240,0.8)',
            'rgba(76,201,240,0.75)',
            'rgba(76,201,240,0.85)',
            'rgba(76,201,240,0.8)',
            'rgba(76,201,240,0.8)',
            'rgba(76,201,240,0.75)'
          ],
          borderColor: '#00f7ff',
          borderWidth: 2,
          borderRadius: 8,      // يعطي شعور ثلاثي الأبعاد لطيف للأعمدة
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1600,
          easing: 'easeOutQuart'
        },
        scales: {
          x: {
            ticks: { color: '#fff' },
            grid: { color: 'rgba(255,255,255,0.06)' }
          },
          y: {
            beginAtZero: true,
            max: 100,
            ticks: { color: '#fff' },
            grid: { color: 'rgba(255,255,255,0.06)' }
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(10,10,12,0.95)',
            titleColor: '#fff',
            bodyColor: '#fff'
          }
        }
      },
      plugins: [glowPlugin]
    });
  }
}


function showSection(index) {
    if (index < 0 || index >= sections.length) return;
    sections.forEach((sec, i) => {
        sec.classList.remove("active-section", "above");
        if (i === index) sec.classList.add("active-section");
        else if (i < index) sec.classList.add("above");
    });
    currentSection = index;
    currentItem = 0;
    resetItems(sections[currentSection]);
}

function resetItems(section) {
    section.querySelectorAll(".item, .chart-section").forEach(el => {
        el.classList.remove("show");
        const bar = el.querySelector(".skill-bar");
        const wrapper = el.querySelector(".skill-bar-wrapper");
        if(bar && wrapper){
            bar.style.width = "0%";
            wrapper.classList.remove("visible");
        }
    });
}

function showNextItem() {
    const items = sections[currentSection].querySelectorAll(".item, .chart-section");
    if(currentItem < items.length){
        const el = items[currentItem];
        el.classList.add("show");
        // تشغيل المخططات عند ظهور chart-section
if (el.classList.contains("chart-section")) {
    createCharts();
}
        const bar = el.querySelector(".skill-bar");
        const wrapper = el.querySelector(".skill-bar-wrapper");
        if(bar && wrapper){
            wrapper.classList.add("visible");
            requestAnimationFrame(()=>{ bar.style.width = bar.dataset.progress; });
        }
        currentItem++;
        return true;
    }
    return false;
}

function hidePrevItem() {
    const items = sections[currentSection].querySelectorAll(".item, .chart-section");
    if(currentItem > 0){
        currentItem--;
        const el = items[currentItem];
        el.classList.remove("show");
        const bar = el.querySelector(".skill-bar");
        const wrapper = el.querySelector(".skill-bar-wrapper");
        if(bar && wrapper){
            wrapper.classList.remove("visible");
            bar.style.width = "0%";
        }
        return true;
    }
    return false;
}

window.addEventListener("wheel", (e) => {
    if(isScrolling) return;
    isScrolling = true;

    if(e.deltaY > 0){
        if(!showNextItem()) showSection(currentSection + 1);
    }else{
        if(!hidePrevItem()){
            showSection(currentSection - 1);
            const prevItems = sections[currentSection].querySelectorAll(".item, .chart-section");
            currentItem = prevItems.length;
            prevItems.forEach(el => {
                el.classList.add("show");
                const bar = el.querySelector(".skill-bar");
                const wrapper = el.querySelector(".skill-bar-wrapper");
                if(bar && wrapper){
                    wrapper.classList.add("visible");
                    bar.style.width = bar.dataset.progress;
                }
            });
        }
    }

    setTimeout(()=>{ isScrolling = false; }, delay);
});
 */

// Typewriter effect
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;
    if (this.isDeleting) delta /= 2;

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function(){ that.tick(); }, delta);
};

// Sections and items
const sections = document.querySelectorAll(".section");
let currentSection = 0;
let currentItem = 0;
let isScrolling = false;
const delay = 800;

// Function to create charts (3D feeling, neon colors)
let chartsCreated = false;
function createCharts() {
    if(chartsCreated) return;
    chartsCreated = true;
        const isMobile = window.innerWidth < 768;

    const doughnutCtx = document.getElementById('skillsDoughnut').getContext('2d');
    new Chart(doughnutCtx, {
        type: 'doughnut',
        data: {
            labels: ['HTML', 'CSS', 'JS', 'TS', 'Git', 'GitHub', 'React', 'Bootstrap', 'SEO'],
            datasets: [{
                label: 'Skill Level',
                data: [90, 85, 80, 75, 70, 85, 80, 75, 70],
                backgroundColor: [
                    '#ff6384','#36a2eb','#ffce56','#4bc0c0','#9966ff','#ff9f40','#00a651','#f032e6','#fabebe'
                ],
                borderColor: '#ffffff33',
                 borderWidth: 2,
                  hoverOffset: 20
            }]
        },
        options: {
            responsive: true,
            plugins: { 
                legend: { 
                    position: isMobile ? 'flex' : 'bottom', 
                    labels: { color: '#fff', font: { size: isMobile ? 5 : 14 }
                 } },
                tooltip: {
                    titleFont: { size: isMobile ? 7 : 14 },
                    bodyFont: { size: isMobile ? 7 : 14 }
                }
            }
        }
    });

    const barCtx = document.getElementById('skillsBar').getContext('2d');
    new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: ['HTML', 'CSS', 'JS', 'TS', 'Git', 'GitHub', 'React', 'Node', 'SQL'],
            datasets: [{
                label: 'Skill Level',
                data: [90, 85, 80, 75, 70, 85, 80, 75, 70],
                backgroundColor: [
                    '#00f2fe','#4facfe','#00f2fe','#36a2eb','#ff6384','#ffce56','#ff9f40','#9966ff','#f032e6'
                ],
                borderRadius: 6,
                barThickness: isMobile ? 7 : 25 // thinner bars on mobile
            }]
        },
        options: {
            responsive: true,
            plugins: { 
                legend: { display: false },
                tooltip: {
                    titleFont: { size: isMobile ? 6 : 14 },
                    bodyFont: { size: isMobile ? 6 : 14 }
                } },
            scales: { y: { beginAtZero: true, max: 100, ticks: { color: '#fff', font: { size: isMobile ? 6 : 12 } // responsive tick size
                    } },
                      x: { ticks: { color: '#fff',  font: { size: isMobile ? 6 : 12 } // responsive tick size
                    } } }
        }
    });
}
// يظهر السكشن الصحيح فور تحميل الصفحة قبل أي أنميشن
document.addEventListener("DOMContentLoaded", () => {
    
    const hash = window.location.hash;
    if(hash){
        const targetSection = document.querySelector(hash);
        if(targetSection){
            targetSection.classList.add("preload-active"); // يظهر السكشن مباشرة
            currentSection = Array.from(sections).indexOf(targetSection);
        }
    } else {
        sections[0].classList.add("preload-active"); // افتراضي: السكشن الأول
        currentSection = 0;
    }
});
// Typewriter initialization
window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) new TxtType(elements[i], JSON.parse(toRotate), period);
    }
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);

    // Flip cards
    const allCards = document.querySelectorAll(".card-inner");
    allCards.forEach(card => {
        setInterval(() => {
            card.classList.toggle("flipped");
        }, 3000);
    });

    // عند إعادة تحميل الصفحة، تحقق من scroll إلى القسم النشط
    sections.forEach((sec,i)=>{
        if(sec.classList.contains('active-section')){
            currentSection = i;
            currentItem = 0;
            resetItems(sec);
            showNextItem();
        }
    });
};

// Smooth scroll for links/buttons (مع استثناء للروابط الخارجية)
document.querySelectorAll('.btn, .nav-item a, .back-a').forEach(link => {
  link.addEventListener('click', function(e){
    const targetId = this.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
      e.preventDefault();
      const targetSection = document.querySelector(targetId);
      if(targetSection){
        const index = Array.from(sections).indexOf(targetSection);
        if(index !== -1){
          showSection(index);
        }
      }
    } else {
      // روابط الصفحات الخارجية تفتح عادي
      window.location.href = targetId;
    }
  });
});


// Section control
function showSection(index){
    if(index < 0 || index >= sections.length) return;
    sections.forEach((sec,i)=>{
        sec.classList.remove("active-section","above");
        if(i===index) sec.classList.add("active-section");
        else if(i<index) sec.classList.add("above");
    });
    currentSection = index;
    currentItem = 0;
    resetItems(sections[currentSection]);
}

function resetItems(section){
    section.querySelectorAll(".item, .chart-section").forEach(el=>{
        el.classList.remove("show");
        const bar = el.querySelector(".skill-bar");
        const wrapper = el.querySelector(".skill-bar-wrapper");
        if(bar && wrapper){
            bar.style.width = "0%";
            wrapper.classList.remove("visible");
        }
    });
}

function showNextItem(){
    const items = sections[currentSection].querySelectorAll(".item, .chart-section");
    if(currentItem < items.length){
        const el = items[currentItem];
        el.classList.add("show");
        const bar = el.querySelector(".skill-bar");
        const wrapper = el.querySelector(".skill-bar-wrapper");
        if(bar && wrapper){
            wrapper.classList.add("visible");
            requestAnimationFrame(()=>{ bar.style.width = bar.dataset.progress; });
        }
        if(el.classList.contains('chart-section')) createCharts();
        currentItem++;
        return true;
    }
    return false;
}

function hidePrevItem(){
    const items = sections[currentSection].querySelectorAll(".item, .chart-section");
    if(currentItem > 0){
        currentItem--;
        const el = items[currentItem];
        el.classList.remove("show");
        const bar = el.querySelector(".skill-bar");
        const wrapper = el.querySelector(".skill-bar-wrapper");
        if(bar && wrapper){
            wrapper.classList.remove("visible");
            bar.style.width = "0%";
        }
        return true;
    }
    return false;
}

const cards = document.querySelectorAll('.card1');

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
    card.style.boxShadow = `${-rotateY*1.5}px ${rotateX*1.5}px 40px rgba(0,0,0,0.6)`;

    const lightX = (x / rect.width) * 100 + '%';
    const lightY = (y / rect.height) * 100 + '%';
    card.style.setProperty('--light-x', lightX);
    card.style.setProperty('--light-y', lightY);
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0)';
    card.style.boxShadow = '0 15px 35px rgba(0,0,0,0.6)';
    card.style.setProperty('--light-x', '50%');
    card.style.setProperty('--light-y', '50%');
  });
});

// Wheel scroll
window.addEventListener("wheel", (e)=>{
    if(isScrolling) return;
    isScrolling = true;

    if(e.deltaY > 0){
        if(!showNextItem()) showSection(currentSection+1);
    } else {
        if(!hidePrevItem()){
            showSection(currentSection-1);
            const prevItems = sections[currentSection].querySelectorAll(".item, .chart-section");
            currentItem = prevItems.length;
            prevItems.forEach(el=>{
                el.classList.add("show");
                const bar = el.querySelector(".skill-bar");
                const wrapper = el.querySelector(".skill-bar-wrapper");
                if(bar && wrapper){
                    wrapper.classList.add("visible");
                    bar.style.width = bar.dataset.progress;
                }
                if(el.classList.contains('chart-section')) createCharts();
            });
        }
    }

    setTimeout(()=>{ isScrolling = false; }, delay);
});

// Touch events for mobile
let touchStartY = 0;
window.addEventListener('touchstart', e=>{
    touchStartY = e.changedTouches[0].clientY;
});
window.addEventListener('touchend', e=>{
    let touchEndY = e.changedTouches[0].clientY;
    if(Math.abs(touchEndY - touchStartY) > 50){
        if(touchEndY < touchStartY){ // swipe up
            if(!showNextItem()) showSection(currentSection+1);
        } else { // swipe down
            if(!hidePrevItem()){
                showSection(currentSection-1);
                const prevItems = sections[currentSection].querySelectorAll(".item, .chart-section");
                currentItem = prevItems.length;
                prevItems.forEach(el=>{
                    el.classList.add("show");
                    const bar = el.querySelector(".skill-bar");
                    const wrapper = el.querySelector(".skill-bar-wrapper");
                    if(bar && wrapper){
                        wrapper.classList.add("visible");
                        bar.style.width = bar.dataset.progress;
                    }
                    if(el.classList.contains('chart-section')) createCharts();
                });
            }
        }
    }
});

// Arrow keys
window.addEventListener('keydown', e=>{
    if(e.key === "ArrowDown"){
        if(!showNextItem()) showSection(currentSection+1);
    }
    if(e.key === "ArrowUp"){
        if(!hidePrevItem()){
            showSection(currentSection-1);
            const prevItems = sections[currentSection].querySelectorAll(".item, .chart-section");
            currentItem = prevItems.length;
            prevItems.forEach(el=>{
                el.classList.add("show");
                const bar = el.querySelector(".skill-bar");
                const wrapper = el.querySelector(".skill-bar-wrapper");
                if(bar && wrapper){
                    wrapper.classList.add("visible");
                    bar.style.width = bar.dataset.progress;
                }
                if(el.classList.contains('chart-section')) createCharts();
            });
        }
    }
});

const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(item => {
  item.addEventListener('click', () => {
    // إزالة الكلاس active من الجميع
    navItems.forEach(i => i.classList.remove('active'));
    // إضافة الكلاس للعنصر المضغوط
    item.classList.add('active');
  });
});

  const body = document.body;
  const toggle = document.getElementById('themeToggle');
  const circle = document.getElementById('toggleCircle');

  toggle.addEventListener('click', () => {
    body.classList.toggle('light'); // Toggle light class
    if(body.classList.contains('light')){
      circle.textContent = '🌞'; // Sun for light theme
    } else {
      circle.textContent = '🌙'; // Moon for dark theme
    }
  });









