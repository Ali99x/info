// Star animation
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.querySelector('.stars').appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
let numStars = 100;
const starSpeed = 0.7;

function initStars() {
    stars = []; // إعادة تعيين النجوم لتجنب تراكمها
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            z: Math.random() * canvas.width
        });
    }
}

function moveStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < stars.length; i++) {
        stars[i].z -= starSpeed;
        if (stars[i].z <= 0) {
            stars[i].z = canvas.width;
        }

        const k = 128.0 / stars[i].z;
        const px = stars[i].x * k + canvas.width / 2;
        const py = stars[i].y * k + canvas.height / 2;

        if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
            const size = (1 - stars[i].z / canvas.width) * 5;
            const shade = parseInt((1 - stars[i].z / canvas.width) * 255);
            ctx.fillStyle = `rgb(${shade}, ${shade}, 255)`;
            ctx.beginPath();
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    requestAnimationFrame(moveStars);
}

initStars();
moveStars();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars(); // إعادة تهيئة النجوم عند تغيير حجم النافذة
});




// إعدادات النافذة المنبثقة
const modal = document.getElementById('info-modal');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.querySelector('.close-btn');
const infoSelect = document.getElementById('info-select');

// معلومات النصوص
const infoText = {
    parallel: `
        <h2>نظام البارليل</h2>
        <p>
            النظام الذي يتيح للطلاب الدراسة في أوقات معينة مع باقي الطلاب في البرنامج العادي (زانكولاين) خلال الفترة الصباحية.
            الاختلاف في المعدل:
            يمكن أن يكون المعدل المطلوب للالتحاق بنظام الموازي أقل من المعدل المطلوب في النظام العادي بحوالي درجة إلى 6 درجات، حسب القسم.
            على سبيل المثال، إذا كان معدل القبول في قسم القانون في النظام العادي هو 85، فإن معدل القبول في نظام البارليل قد يكون 83، وبالتالي قد يُقبل الطالب إذا كان معدله في هذا النطاق.
        </p>
        <p>✅ لا يوجد فرق في درجة الشهادة بين النظام العادي ونظام البارليل.</p>
    `,
    load: `
        <h2>نظام التحميل</h2>
        <p>
            النظام الذي يتيح للطالب فرصة تقديم امتحان وزاري لمادة واحدة أو مادتين فقط، دون الحاجة لتقديم امتحانات باقي المواد التي نجح فيها.
            لا يُطلب من الطالب حضور المدرسة أو الدوام فيها.
            يشارك الطالب فقط في الامتحانات الوزارية مع باقي الطلاب.
            يحق له التقدم في الدور الأول والدور الثاني.
            لا يؤثر ذلك على المعدل أو القبول في الجامعة.
        </p>
        <p>وفقاً لقرار وزاري جديد:</p>
        <p>
            مسموح للطالب بالتحميل مرتين فقط. بعد ذلك، إذا رسب، يُعتبر طالباً خارجياً.
            تسجيل التحميل: يتم التسجيل في شهر نوفمبر. يُطلب دفع مبلغ 50 ألف دينار، مع تقديم المستمسكات المطلوبة.
        </p>
    `
};

// عرض النافذة المنبثقة
infoSelect.addEventListener('change', (event) => {
    const value = event.target.value;
    if (infoText[value]) {
        modalBody.innerHTML = infoText[value];
        modal.style.display = 'flex';
    }
});

// إغلاق النافذة المنبثقة
closeBtn.addEventListener('click', () => {
    modal.classList.add('hide');
    setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.remove('hide');
    }, 500);
});

// إغلاق النافذة عند النقر خارجها
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeBtn.click();
    }
});



const menuButton = document.getElementById('menu-button');
    const sideMenu = document.getElementById('side-menu');
    
    // فتح القائمة الجانبية عند الضغط على زر القائمة
    menuButton.addEventListener('click', () => {
        sideMenu.classList.toggle('open');
    });

    // إغلاق القائمة الجانبية عند النقر في أي مكان داخل الموقع
    document.addEventListener('click', (e) => {
        if (!sideMenu.contains(e.target) && e.target !== menuButton) {
            sideMenu.classList.remove('open');
        }
    });

    // دالة لفتح صفحات الويب عند النقر على أزرار القائمة
    function openPage(url) {
        window.open(url, '_blank');
    }

    // استماع لحدث النقر على أزرار القائمة وفتح الصفحات المناسبة
    sideMenu.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            const url = button.dataset.url;
            if (url) {
                openPage(url);
            }
        });
 

 });
function openPage(url) {
    window.location.href = url;
}
