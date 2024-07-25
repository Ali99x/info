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
             يتيح للطلاب الدراسة في أوقات معينة مع باقي الطلاب في البرنامج العادي (زانكولاين) خلال الفترة الصباحية.
            الاختلاف في المعدل:
            يمكن أن يكون المعدل المطلوب للالتحاق بنظام الموازي أقل من المعدل المطلوب في النظام العادي بحوالي درجة إلى 6 درجات، حسب القسم.
            على سبيل المثال، إذا كان معدل القبول في قسم القانون في النظام العادي هو 85، فإن معدل القبول في نظام البارليل قد يكون 83، وبالتالي قد يُقبل الطالب إذا كان معدله في هذا النطاق.
        </p>
        <p> لا يوجد فرق في درجة الشهادة بين النظام العادي ونظام البارليل.</p>
    `,
    load: `
        <h2>نظام التحميل</h2>
        <p>
         يتيح للطالب فرصة تقديم امتحان وزاري لمادة واحدة أو مادتين فقط، دون الحاجة لتقديم امتحانات باقي المواد التي نجح فيها.
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
    `,
    
    
    privateUniversities: `
<h2>الجامعات الأهلية المعترفة </h2>
<h5>الجامعات الأهلية المعترف بها في كوردستان✅</h5>

      <h4>مدينة السليمانية:</h4>
<p>
    1. الجامعة الأمريكية , 2. جامعة كومار , 3. جامعة التنمية البشرية , 4. جامعة جيهان , 5. جامعة تيشك , 6. جامعة قيوان , 7. جامعة گويژه
</p>

<h4>مدينة أربيل:</h4>
<p>
    1. جامعة تيشك , 2. جامعة جيهان , 3. الجامعة اللبنانية الفرنسية , 4. جامعة نولج , 5. جامعة بيان , 6. جامعة أربيل الدولية , 7. الجامعة الكاثوليكية , 8. جامعة القلعة
</p>

<h4>مدينة دهوك:</h4>
<p>
    1. جامعة جيهان , 2. جامعة نوروز
</p>

    `,
    
    different:`
<h2>ماهي الجامعة التقنية</h2>
<h6>الفرق بين الجامعة العادية والجامعة التقنية</h6>

<p>
    <strong>مدة الدراسة:</strong><br>
    1. لا يوجد فرق ؛ حيث تستمر الدراسة في كلتيهما عادةً لمدة أربع سنوات للحصول على البكالوريوس.
</p>

<p>
<strong>نوع الشهادة :</strong><br>
    2. تُمنح الجامعة التقنية شهادة "بكالوريوس تقني"، بينما الجامعة الاعتيادية شهادة "بكالوريوس".
</p>

<p>
    * في الجامعة التقنية، التركيز بشكل أكبر على الجوانب العملية والتطبيقية، مع تقديم تدريب عملي مكثف. وقد لا تتواجد بعض الأقسام في الجامعة التقنية التي تكون موجودة في الجامعة الاعتيادية.<br>
* في الجامعة الاعتيادية، يتم التركيز على الجانب النظري اكثر من العملي.
</p>
    
 ` ,
 
 req:`
<h2>متطلبات التقديم الجامعي</h2>
<h6>متطلبات التسجيل في الجامعات  الحكومية</h6>
<p>
*هذه فقط الجامعات الحكومية وليست الاهلية.<br>
    1. هوية - الجنسية أو البطاقة الموحدة.<br>
    2. بطاقة السكن.<br>
    3. البطاقة التموينية.<br>
    4. عشر صور ملونة.<br>
    5. مبلغ قدره 60,000 دينار او اقل.<br>
    6. فحص عين + فحص نوع الدم.<br>
    7. درجات الصف السادس مصدقة.<br>
    8. كفيل موظف في الدولة، بشرط أن لا يقل راتبه عن 250,000 دينار، وأن يكون الكفيل حاضراً مع الطالب.<br>
    * المتطلبات تختلف من جامعة إلى أخرى.
</p>

<p>
    <strong>بالنسبة لحاملي الجنسيات الأخرى:</strong><br>
    تختلف الشروط، مثلاً استبدال الجنسية بالإقامة.
</p>

  ` ,
  
  lang:`
 <h2>لغة الدراسة في الجامعة</h2>

<p>
    <strong>1. بشكل عام:</strong> ان لغة الدراسة في الجامعة تكون حسب القسم.
</p>

<p>
    <strong>2. كليات الإدارة والاقتصاد وكلية القانون:</strong><br>
    يتم تدريس المواد، الامتحانات، كتابة التقارير، وغيرها باللغة العربية. ومع ذلك، فإن الشرح من قبل الأساتذة يتم عادةً باللغة الكوردية، وقد يستخدم الأساتذة اللغة العربية أحياناً.
</p>

<p>
    <strong>3. بقية الأقسام:</strong><br>
 لغة دراستها باللغة الإنجليزية، و يُقدَّم الشرح من قبل الأساتذة باللغتين الكوردية والإنجليزية.
 </p>

<p>
    <strong>4. الجامعات الأهلية:</strong><br>
   قد يقوم بعض الأساتذة بشرح المواد باللغة العربية عند طلب الطلاب، بشكل عام، يتم تقديم الشرح باللغة الكوردية، و تكون مواد الدراسة باللغة الإنجليزية أو العربية.
</p>
 
  
     `  ,
kurd:`

 <h2>مادة الكوردولوجي</h2>>

<p>
    <strong>1.مادة الكوردولوجي او كوردناسى: مادة تُدرس في الجامعات في السنة الأولى فقط.</strong><br>
 
</p>

<p>
    <strong>2. محتويات الكتاب او الملزمة:</strong><br>
تختلف محتويات الكتاب من جامعة إلى أخرى، ولكن بشكل عام تشمل دراسة <strong>تاريخ كردستان، الأديان، الإمارات، والجغرافيا الكردية</strong>. تُقيَّم المادة بنفس الطريقة التي تُقيَّم بها باقي المواد ، ويتم تدريسها باللغة الكوردية.
</p>

<p>
    <strong>3. التشابه مع مواد أخرى:</strong><br>
    قد تكون محتويات المادة مشابهة لمحتويات مادة التاريخ التي تم دراستها في المدرسة الإعدادية أو المتوسطة.
</p>

<p>
    <strong>4. تدريس المادة في الجامعات الأهلية:</strong><br>
    في بعض الجامعات الأهلية، يتم تدريس المادة باللغة العربية بناءً على طلب الطلاب.
</p>
  `  ,
   dis:`
<h2>تخفيضات مبلغ الباراليل</h2>

<p>
    <strong>الطلاب الحاصلون على الترتيب الأول:</strong><br>
    يحصلون على تخفيض بنسبة <strong>75%</strong> من رسوم الدراسة في السنة التي يحصلون فيها على الترتيب الأول.
</p>

<p>
    <strong>الطلاب الحاصلون على الترتيب الثاني:</strong><br>
    يحصلون على تخفيض بنسبة <strong>50%</strong> من رسوم الدراسة في السنة التي يحصلون فيها على الترتيب الثاني.
</p>

<p>
    <strong>الطلاب الحاصلون على الترتيب الثالث:</strong><br>
    يحصلون على تخفيض بنسبة <strong>25%</strong> من رسوم الدراسة في السنة التي يحصلون فيها على الترتيب الثالث.
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
    }, 0);
});

// إغلاق النافذة عند النقر خارجها
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeBtn.click();
        modal.classList.remove('hide');
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

// script.js
window.onload = function() {
    const message = document.getElementById('welcomeMessage');

    // عرض الرسالة
    message.classList.add('show');

    // إخفاء الرسالة بعد 4 ثوانٍ
    setTimeout(() => {
        message.classList.remove('show');
        message.classList.add('hide');
    }, 4000);
};




// منع النسخ
document.addEventListener('copy', function(e) {
    e.preventDefault();
});

// منع استخدام قائمة السياق (النقر بزر الفأرة الأيمن)
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// منع تحديد النصوص
document.addEventListener('selectstart', function(e) {
    e.preventDefault();
});

document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey && e.key === 'c') || (e.ctrlKey && e.key === 'v')) {
        e.preventDefault();
    }
});
