
const nextButton = document.querySelectorAll(".js-next")
const preButton = document.querySelectorAll(".js-pre")
const progressBar = document.querySelector(".progress-bar");
const progressBarArea = document.querySelector(".form-progress");
const steps = document.querySelectorAll(".form-progress-indicator");
const formStep = document.querySelectorAll(".js-form-step")
const menuStep = document.querySelectorAll(".js-check-Step")

let active = 1;
const data = [
    {
        材料: "上固定板",
        項次: "1",
        材質: "S50C",
        數量: "1",
        厚: "20",
        寬: "0",
        長: "0",
        實重:"0.00"
    },
    {
        材料: "上固定板",
        項次: "1",
        材質: "S50C",
        數量: "1",
        厚: "20",
        寬: "0",
        長: "0",
        實重:"0.00"
    }
]

function init() {
    const select = $(".form-progress-indicator.three")
    const next = $(select).next();
    const prev = $(select).prev();
    const prevSecond = $(prev).prev();
    const nextSecond = $(next).next();
    if ($(".form-progress-indicator").hasClass("three")) {
        select.addClass("selected")
        prev.addClass("prev")
        prevSecond.addClass("secondPre")
        next.addClass("next")
        nextSecond.addClass("secondNext")
    }
}
init()

function tableInit() {
    data.forEach((item) => {
        let htmlTemplate = ''
        htmlTemplate = `
        <tr>
            <td>${item.材料}</td>
            <td>${item.項次}</td>
            <td>${item.材質}</td>
            <td>${item.數量}</td>
            <td>${item.厚}</td>
            <td>${item.寬}</td>
            <td>${item.長}</td>
            <td>${item.實重}</td>
            <td>
                <span class="btn table-edit" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fas fa-pencil-alt"></i></span>
                <span class="btn table-cancel"><i class="fas fa-trash-alt"></i></span>
            </td>
        </tr>
        `
        const tbody = document.querySelector('.step2');
        tbody.innerHTML += htmlTemplate
    })
}
function moveCurrent(element) {
    if (element == "下一頁") {
        const selected = $(".selected").next();
        const next = $(selected).next();
        const prev = $(selected).prev();
        const prevSecond = $(prev).prev();
        const nextSecond = $(next).next();
        if (active > 3 ) { 
            $(selected).removeClass("next secondNext prev secondPre hidden").addClass("selected");
            $(prev).removeClass("next secondNext secondPre selected hidden").addClass("prev");
            $(next).removeClass("secondNext secondPre selected hidden").addClass("next");
            $(nextSecond).removeClass("secondPre prev next selected hidden").addClass("secondNext");
            $(prevSecond).removeClass("secondNext prev next selected hidden").addClass("secondPre");
            $(prevSecond).prevAll().removeClass("next secondNext prev secondPre").addClass('hidden')
            $(nextSecond).nextAll().removeClass("next secondNext prev secondPre").addClass('hidden')
        } 
    }
    else if (element == "上一頁") {
        const selected = $(".selected").prev();
        const next = $(selected).next();
        const prev = $(selected).prev();
        const prevSecond = $(prev).prev();
        const nextSecond = $(next).next();

        $(selected).removeClass("next secondNext prev secondPre hidden").addClass("selected");
        $(prev).removeClass("next secondNext secondPre selected hidden").addClass("prev");
        $(next).removeClass("secondNext secondPre selected hidden").addClass("next");
        $(nextSecond).removeClass("secondPre prev next selected hidden").addClass("secondNext");
        $(prevSecond).removeClass("secondNext prev next selected hidden").addClass("secondPre");
        $(prevSecond).prevAll().removeClass("next secondNext prev secondPre").addClass('hidden')
        $(nextSecond).nextAll().removeClass("next secondNext prev secondPre").addClass('hidden')
        if (active < 3) { 
            const select = $(".form-progress-indicator.three");
            const next = $(select).next();
            const prev = $(select).prev();
            const prevSecond = $(prev).prev();
            const nextSecond = $(next).next();
            select.removeClass("next secondNext prev secondPre hidden").addClass("selected")
            prev.removeClass("next secondNext prev secondPre hidden selected").addClass("prev")
            prevSecond.removeClass("next secondNext prev secondPre hidden selected").addClass("secondPre")
            next.removeClass("next secondNext prev secondPre hidden selected").addClass("next")
            nextSecond.removeClass("next secondNext prev secondPre hidden selected").addClass("secondNext")
        } 
    }
    else {
        let selected = element;
        steps.forEach((step) => {
            const currentStep = step.getAttribute("data-step")
            if (selected == currentStep ) {
                const select = $(".form-progress-indicator.three");
                const next = $(select).next();
                const prev = $(select).prev();
                const prevSecond = $(prev).prev();
                const nextSecond = $(next).next();
                if (selected == 2 ) { 
                    select.removeClass("next secondNext prev secondPre actives hidden").addClass("selected")
                    prev.removeClass("next secondNext prev secondPre hidden selected").addClass("prev actives")
                    prevSecond.removeClass("next secondNext prev secondPre hidden selected").addClass("secondPre")
                    next.removeClass("next secondNext prev secondPre hidden selected actives").addClass("next")
                    nextSecond.removeClass("next secondNext prev secondPre hidden selected actives").addClass("secondNext");
                    progressBar.style.width = 25 + "%";
                }
                else if (selected == 1) {
                    select.removeClass("next secondNext prev secondPre hidden actives ").addClass("selected")
                    prev.removeClass("next secondNext prev secondPre hidden actives selected").addClass("prev")
                    prevSecond.removeClass("next secondNext prev secondPre hidden selected").addClass("secondPre actives ")
                    next.removeClass("next secondNext prev secondPre hidden selected actives").addClass("next")
                    nextSecond.removeClass("next secondNext prev secondPre hidden selected actives").addClass("secondNext");
                    progressBar.style.width = 0 + "%";
                }
                else {
                const selected = $(step).removeClass("next secondNext prev secondPre hidden").addClass("selected");
                const next = $(selected).next();
                const prev = $(selected).prev();
                const prevSecond = $(prev).prev();
                const nextSecond = $(next).next();
                $(selected).removeClass("next secondNext prev secondPre hidden").addClass("selected actives");
                $(prev).removeClass("next secondNext secondPre selected hidden").addClass("prev actives");
                $(next).removeClass("secondNext secondPre selected actives hidden").addClass("next");
                $(nextSecond).removeClass("secondPre prev next selected actives hidden").addClass("secondNext");
                $(prevSecond).removeClass("secondNext prev next selected hidden").addClass("secondPre actives");
                $(prevSecond).prevAll().removeClass("next secondNext prev secondPre").addClass('hidden')
                $(nextSecond).nextAll().removeClass("next secondNext prev secondPre").addClass('hidden')
                progressBar.style.width = 50 + "%";
                }
            }
        })
    }
}


nextButton.forEach((next) => {
    next.addEventListener("click", (e) => {
    active++
    if (active > steps.length) {
        active = steps.length;
    }
        updateProgress()
        moveCurrent("下一頁")
        updateForm()
        updateMenu()
        tableInit()
    })
})

preButton.forEach((pre) => {
    pre.addEventListener("click", () => {
    active--;
    if (active < 1) {
        active = 1;
    }
        preProgress()
        moveCurrent("上一頁")
        updateForm()
        updateMenu()
    })
})

function updateForm() {
    formStep.forEach((form) => {
        const currentStep = form.getAttribute("data-step")
        if (active == currentStep) {
            form.classList.remove("hidden")
        } else {
            form.classList.add("hidden")
        }
    })
}

function updateMenu() {
    menuStep.forEach((menu,index,arr) => {
        const currentMenu = menu.getAttribute("data-slide")
        const parentNode = menu.parentNode.previousElementSibling
        if (active == 1) {
            arr[0].classList.add("active")
            arr[0].classList.add("onPage")
            menu.classList.remove("onPage")
        }
        else if (active == currentMenu && active !== 1) {
            menu.classList.add("active")
            menu.classList.add("onPage")
            menu.classList.remove("disabled")
            parentNode.children[0].firstChild.classList = "far fa-check-circle"
        }
        else {
            menu.classList.remove("onPage")
        }
        menu.addEventListener("click",(e) => {
            const clickTarget = e.target.getAttribute("data-slide")
            const onClick = e.target
            $(".preloader").css('display','flex')
            setInterval(removeLoader, 1000)
            if (clickTarget !== "") {
                onClick.classList.add("onPage")
                $(onClick).parent().siblings().children().removeClass("onPage")
            }
            formStep.forEach((form) => {
                const currentForm = form.getAttribute("data-step")
                if (currentMenu == currentForm ) {
                    form.classList.remove("hidden");
                    moveCurrent(clickTarget)
                }
                else {
                    form.classList.add("hidden")
                }
            })
        })
    })
}

function updateProgress() {
    // toggle active class on list items
    steps.forEach((step, i) => {
        const actives = document.querySelectorAll('.actives')
        if (i < active) {
            progressBar.style.width = (actives.length) * 25 + '%'
            step.classList.add("actives");
        } 
        else {
            step.classList.remove("actives");
        }
        if (active > 3) {
            progressBar.style.width = 50 + "%";
        }
    });   
    
}

function preProgress() {
    // toggle active class on list items
    steps.forEach((step, i) => {
        // const nowStep = step.style.left
        // let nowStepLeft = Number(nowStep.slice(0, nowStep.length - 1))
        const actives = document.querySelectorAll('.actives')
        console.log(actives);
        if(i < active) {
            progressBar.style.width = (actives.length) * 25 + '%'
            step.classList.add("actives");
        } 
        else {
            step.classList.remove("actives");
        }
        if (active > 2) {
            progressBar.style.width = 50 + "%";
         }
         else if (active == 2) {
             progressBar.style.width = 25 + "%";
        }
         else {
             progressBar.style.width = 0 + "%";
        }
    });   
}

function removeLoader() {
    if ($(".preloader").css('display') == 'none') {
        clearInterval(removeLoader)
    } else {
        $( ".preloader" ).fadeOut(2500)
    }
    
}

function collapse() {
    const controlCollapse = document.querySelectorAll(".js-inline-next")
    const collapseItem = document.querySelectorAll(".js-collapse")
    controlCollapse.forEach((item) => {
        item.addEventListener("click", (e) => {
            const controlButton = e.target.getAttribute("data-open")
            collapseItem.forEach((x) => {
                const showItem = x.getAttribute("id")
                if (controlButton == showItem) {
                    x.classList.add("show")
                    item.closest(".accordion-collapse").classList.remove("show")
                }
            })
        })
    })
}
collapse()