import styles from './VinhoCard.module.css'
import { BsTrash3 } from 'react-icons/bs'

function VinhoCard({ id, nome, uva, descricao, handleRemove }) {

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }

    return (
        <div className={styles.vinho_card}>
            <div>
                <p><span>Nome: </span>{nome}</p>
                <p><span>Uva: </span>{uva}</p>
                <p><span>Descrição: </span>{descricao}</p>
            </div>
            <div className={styles.vinho_card_actions}>
                <button onClick={remove} to="/">
                    <BsTrash3 />
                </button>
            </div>
        </div>
    )
}

export default VinhoCard