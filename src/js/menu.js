const sidebarArea = document.querySelector('#sidebar-wrapper')
export const sidebar = () => {
    let template = `
    <ul class="navbar-nav">
        <li class="nav-item"><a href="index.html" class="nav-link"><i class="fa-icon fas fa-home "></i> index</a></li>
    </ul>
    `
    sidebarArea.innerHTML = template
}