import './style.scss'

const Item = (props: { active: any; icon: any; name: any; }) => {
    return (
        <li className={props.active ? "nav-item active" : "nav-item"}>
            {props.icon ? <i className="item-icon material-icons">{ props.icon }</i> : "" }<span className="item-content">{ props.name }</span>
        </li>
    )
}

export default Item;