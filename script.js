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
    يتيح للطلاب الدراسة مع باقي الطلاب في البرنامج العادي (زانكولاين) خلال الفترة الصباحية.
</p>
<p>
    <strong>الاختلاف في المعدل:</strong><br>
    يمكن أن يكون المعدل المطلوب للالتحاق بنظام الموازي أقل من المعدل المطلوب في النظام العادي بحوالي درجة إلى <strong>6</strong> درجات، حسب القسم.
    على سبيل المثال، إذا كان معدل القبول في قسم القانون في النظام العادي هو <strong>85</strong>، فإن معدل القبول في نظام البارليل قد يكون <strong>83</strong>، وبالتالي قد يُقبل الطالب إذا كان معدله في هذا النطاق.
</p>
<p><strong>لا يوجد فرق في درجة الشهادة بين النظام العادي ونظام البارليل.</strong></p>

    `,
    
    privateUniversities: `
<h2>الجامعات الأهلية المعترفة </h2>
<h5>✅المعترف بها في كوردستان</h5>

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

 <h2>مادة الكوردولوجي</h2>

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
 `  ,
   credit:`
<h2>نظام كريديت</h2>

<p>
    <strong>تعريف النظام:</strong><br>
    نظام الكريديت هو عملية حسابية لحساب معدل الطالب. يتم حساب معدل السادس بنسبة <strong>70%</strong>، بينما تشكل الـ <strong>30%</strong> المتبقية نسباً من مواد القسم المراد التقديم له.
</p>

<p>
    <strong>مثال على التطبيق:</strong><br>
    على سبيل المثال، قسم الهندسة الميكانيكية يعتمد على مواد مثل الإنجليزية، الرياضيات، والفيزياء.
</p>

<p>
    <strong>التقديم الإلكتروني:</strong><br>
    لا يحتاج الطالب لحساب معدله لكل قسم، حيث يتم التقديم إلكترونياً. عند اختيار الطالب للقسم، يظهر الموقع معدله وفق نظام الكريديت.
</p>

<p>

يمكن تطبيقه في الجامعات الأهلية أيضاً.
</p>

 `  ,
   approve1:`
<h2>تصديق الشهادة الجامعية</h2>
<p><strong>الحصول على الشهادة من الجامعة:</strong></p>
<ul>
    <li>رسوم الشهادة قد تكون 50,000 دينار.</li>
    <li>تصديق الشهادة في وزارة التعليم العالي في أربيل.</li>
</ul>

<p><strong>زيارة وزارة العدل:</strong></p>
<ul>
    <li>القيام بالإجراءات اللازمة في وزارة العدل.</li>
    <li>زيارة مركز العلاقات الخارجية.</li>
</ul>

<p><strong>ختم مكتب بغداد:</strong></p>
<ul>
    <li>تحقق مما إذا كنت بحاجة للحصول على ختم مكتب بغداد. قد يكلف الختم 20,000 دينار للختم الواحد.</li>
    <li><strong>ملاحظة:</strong> قد تحتاج إلى حجز موعد قبل الذهاب لمكتب بغداد.</li>
</ul>


 `  ,
   approve2:`

<h2>تصديق الشهادة الإعدادية</h2>


<p><strong>الحصول على الشهادة من المدرسة:</strong></p>
<ul>
    <li>تأكد من أن الشهادة موقعة ومختومة من المدرسة.</li>
</ul>

<p><strong>زيارة مديرية التربية:</strong></p>
<ul>
    <li>تقدم بطلب لتحويل الشهادة إلى اللغة الإنجليزية لأغراض السفر.</li>
    <li>مديرية التربية ستصدر وثيقة الدرجات وليس الشهادة.</li>
</ul>

<p><strong>زيارة وزارة التربية في أربيل:</strong></p>
<ul>
    <li>ستحصل على شهادة بلون أبيض وأزرق باللغة الإنجليزية تحتوي على درجاتك، اسمك، والفرع.</li>
</ul>


 `  ,
   uhd1:`

<h2> درجات جامعة التنمية البشرية </h2>

<p>في جامعة التنمية البشرية، يتم تقييم الدرجات للطلاب على شكل مستويات (LEVEL) وليس علامات (GRADE). فيما يلي توضيح للدرجات والمستويات الخاصة بها:</p>

<table>
     <thead>
            <tr>
             
            </tr>
        </thead>
    <tbody>
        <tr>
            <td>90-100</td>
            <td>Level - AA</td>
        </tr>
        <tr>
            <td>85-89</td>
            <td>Level - BA</td>
        </tr>
        <tr>
            <td>80-84</td>
            <td>Level - BB</td>
        </tr>
        <tr>
            <td>75-79</td>
            <td>Level - CB</td>
        </tr>
        <tr>
            <td>70-74</td>
            <td>Level - CC</td>
        </tr>
        <tr>
            <td>60-69</td>
            <td>Level - DC</td>
        </tr>
        <tr>
            <td>50-59</td>
            <td>Level - DD</td>
        </tr>
        <tr>
           <td class="highlight">00-49</td>
                    <td>Level - FF</td>
        </tr>
    </tbody>
</table>

<p>قد تختلف الأرقام قليلاً في باقي الجامعات.</p>
 `  ,
   adaby:`

<h2> الأقسام  للطالب الادبي </h2>

<p>يمكن لطلاب <strong>الفرع الأدبي</strong> الذين يودون التقديم للجامعات التخصص في مجموعة متنوعة من الأقسام الأكاديمية. تشمل بعض هذه الأقسام:</p>



  <table>
            <thead>
                <tr>
                    <th>القسم</th>
                   <th>متاح</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>القانون</td>
                    <td class="checkmark">  ✅  </td>
                </tr>
                <tr>
                    <td>علوم سياسية</td>
                    <td class="checkmark">✅</td>
                </tr>
                <tr>
                    <td>علاقات دولية</td>
                    <td class="checkmark">✅</td>
                </tr>
                <tr>
                    <td>اللغة العربية</td>
                    <td class="checkmark">✅</td>
                </tr>
                <tr>
                    <td>اللغة الكوردية</td>
                    <td class="checkmark">✅</td>
                </tr>
                <tr>
                    <td>اللغة الفارسية</td>
                    <td class="checkmark">✅</td>
                </tr>
                <tr>
                    <td>اللغة الفرنسية</td>
                    <td class="checkmark">✅</td>
                </tr>
                <tr>
                    <td>اللغة الألمانية</td>
                    <td class="checkmark">✅</td>
                </tr>
                <tr>
                    <td>اللغة التركية</td>
                    <td class="checkmark">✅</td>
                </tr>
                <tr>
                    <td>الترجمة</td>
                    <td class="checkmark">✅</td>
                </tr>
                <tr>
                    <td>إدارة أعمال</td>
                    <td class="checkmark">✅</td>
                </tr>
                <tr>
                    <td>اقتصاد</td>
                    <td class="checkmark">✅</td>
                </tr>
                <tr>
                    <td>الإعلام</td>
                    <td class="checkmark">✅</td>
                </tr>
                <tr>
                    <td>سياحة وسفر</td>
                    <td class="checkmark">✅</td>
                </tr>
                <tr>
                    <td>إدارة التسويق</td>
                    <td class="checkmark">✅</td>
                </tr>
                <tr>
                    <td>إدارة المشاريع</td>
                    <td class="checkmark">✅</td>
                </tr>
                <tr>
                    <td>الإدارة الصحية</td>
                    <td class="checkmark">✅</td>
                </tr>
                <tr>
                    <td>إدارة الجمارك</td>
                    <td class="checkmark">✅</td>
                </tr>
                <tr>
                    <td>حقوق الإنسان</td>
                    <td class="checkmark">✅</td>
                </tr>
                <tr>
                    <td>علم نفس</td>
                    <td class="checkmark">✅</td>
                </tr>
                <tr>
                    <td>علم الاجتماع</td>
                    <td class="checkmark">✅</td>
                </tr>
                <tr>
                    <td>تربية خاصة</td>
                    <td class="checkmark">✅</td>
                </tr>
                <tr>
                    <td>إرشاد تربوي</td>
                    <td class="checkmark">✅</td>
                </tr>
                <tr>
                    <td>الثروة الحيوانية</td>
                    <td class="checkmark">✅</td>
                </tr>
                <tr>
                    <td>تنمية بشرية</td>
                    <td class="checkmark">✅</td>
                </tr>
               
                <tr>
                    <td>علاقات عامة</td>
                    <td class="checkmark">✅</td>
                </tr>
                <tr>
                    <td>آثار</td>
                    <td class="checkmark">✅</td>
                </tr>
                <tr>
                    <td>فلسفة</td>
                    <td class="checkmark">✅</td>
                </tr>
                <tr>
                    <td>روضة أطفال</td>
                    <td class="checkmark">✅</td>
                </tr>
                <tr>
                    <td>مبادئ الدين</td>
                    <td class="checkmark">✅</td>
                </tr>
                <tr>
                    <td>تربية رياضة</td>
                    <td class="checkmark">✅</td>
                </tr>
                <tr>
                    <td>كلية الفنون</td>
                    <td class="checkmark">✅</td>
                </tr>
            </tbody>
        </table>

<p>قد تتوفر أقسام وتخصصات أخرى في الجامعات الأهلية وبعض المعاهد الحكومية، لذا يُفضل عدم الاعتماد على هذه البيانات فقط.</p>
<p>عند التقديم الجامعي، يمكنك الاطلاع على جميع الأقسام التي تقبل معدلك وتخصصك، سواء كان <strong>أدبي</strong> أو <strong>علمي</strong>، عبر موقع <strong>الزانكولاين</strong>.</p>
<p>فرع العلمي تقبله جميع الاقسام تقريباً.</p>

 `  ,
   how:`

<h2> التقديم للجامعات الأهلية</h2>
        <p><strong>الذهاب للجامعة:</strong> ابدأ بزيارة الجامعة التي ترغب في التقديم إليها.</p>
        <p><strong>الذهاب للمدرسة:</strong> بعد ذلك، توجه إلى مدرستك الثانوية للحصول على الوثائق المطلوبة.</p>
        <p><strong>الذهاب لدائرة التربية:</strong> قم بزيارة مديرية التربية المرتبطة بمدرستك لتصديق الوثائق.</p>
        <p><strong>العودة للجامعة:</strong> أخيرًا، عد إلى الجامعة لتقديم الأوراق والمستندات المطلوبة.</p>
        <p>ستتلقى تعليمات في كل دائرة تزورها، تحتوي على قائمة بالمتطلبات والأوراق المطلوبة.</p>
        
    <p><strong>الاوراق المطلوبة من الجامعة:</strong></p>
        <ul>
            <li><strong>شهادة الإعدادية:</strong> مختومة من المدرسة ومديرية التربية.</li>
            <li><strong>كود التقديم الوزاري:</strong> الذي حصلت عليه من المدرسة سابقًا.</li>
            <li><strong>المستمسكات الشخصية:</strong> مثل الهوية الشخصية، بطاقة السكن، البطاقة التموينية، تأييد السكن، ورقة من مختار المنطقة.</li>
            <li><strong>صور شخصية:</strong> من 4 إلى 8 صور.</li>
            <li><strong>نسخة ملونة من جواز السفر:</strong> إذا كان متوفرًا.</li>
            <li><strong>فحص البصر:</strong> يمكن إجراؤه في أي مستشفى بكلفة حوالي 5000 دينار.</li>
            <li><strong>فحص نوع الدم.</strong></li>
        </ul>

       <p><strong>ملاحظات هامة:</strong></p>
        <p><strong>القسط الجامعي:</strong> قد يتطلب منك دفع جزء من الرسوم الدراسية عند التقديم.</p>
        <p><strong>الطلاب غير العراقيين:</strong> يجب عليهم إحضار جواز السفر والإقامة.</p>

<p><strong>عند الذهاب للمدرسة:</strong></p>
        <p>ستطلب منك المدرسة ورقة من الجامعة تثبت رغبتك في الدراسة بها.</p>
        <p>بعد الحصول على الشهادة، توجه إلى مديرية التربية التابعة لمدرستك لتصديقها وختمها.</p>

<p><strong>تفاصيل اضافية :</strong></p>
        <p><strong>الزيارة الأولى للجامعة:</strong> قد لا يُطلب منك أي شيء سوى اختيار الأقسام المراد التقديم لها، وبعد ذلك سيتم الاتصال بك لإكمال التسجيل.</p>
        <p><strong>اختلاف التفاصيل بين الجامعات:</strong> قد تختلف التفاصيل قليلاً من جامعة لأخرى. يفضل دائمًا الاستفسار وسؤال الجامعة عن أي متطلبات إضافية.</p>

<p><strong>عرض القبولات :</strong></p>
        <p><strong>موقع خاص:</strong> يتم عرض نتائج القبول على موقع خاص يختلف عن موقع الزانكولاين، وهو موقع مخصص للجامعات الاهلية فقط.</p>
        <p><strong>القبول دون انتظار النتائج:</strong> في معظم الحالات، سيتم قبولك دون الحاجة لانتظار النتائج، ولكن فقط للتأكيد.</p>

<p>يمكنك التقديم لاكثر من جامعة ومعهد اهلي.</p>

 `  ,
   krar:`
<h2>قرار حذف مادة الكوردي</h2>
<p>
     قرار حذف مادتي الكوردي والعربي من المؤكد بانه سيظل ساريًا للسنة الدراسية (2024-2025). 
</p>
<p>
    ووفقًا للقرار الذي صدر منذ سنوات، فإن هذا القانون سينتهي تلقائيًا بعد السنة الدراسية <strong>2024-2025</strong>، بحيث لن يكون ساريًا بدءًا من السنة الدراسية <strong>2025-2026</strong>.
</p>
<p>
    قد تتم مراجعة نتائج تطبيق هذا القانون خلال السنوات السابقة لتحديد تأثيره على جودة التعليم وتحصيل الطلاب.
</p>
<p>
    ومن المحتمل أن تصدر قرارات بديلة له في المستقبل.
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
    menuButton.classList.toggle('clicked'); // إضافة أو إزالة الفئة لإحداث الحركة
});

// إغلاق القائمة الجانبية عند النقر في أي مكان داخل الموقع
document.addEventListener('click', (e) => {
    if (!sideMenu.contains(e.target) && e.target !== menuButton) {
        sideMenu.classList.remove('open');
        menuButton.classList.remove('clicked'); // إزالة الفئة عند إغلاق القائمة
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
