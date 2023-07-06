import styles from './VagaCard.module.css'
import { BsTrash3 } from 'react-icons/bs'

function VagaCard({ id, cargo, modalidade_trabalho, modalidade_contrato, descricao, handleRemove }) {

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }

    return (
        <div className={styles.vaga_card}>
            <div>
                <p><span>Cargo: </span>{cargo}</p>
                <p><span>Modalidade: </span>{modalidade_trabalho}</p>
                <p><span>Contratação: </span>{modalidade_contrato}</p>
                <p><span>Descrição: </span>{descricao}</p>
            </div>
            <div className={styles.vaga_card_actions}>
                <button onClick={remove} to="/">
                    <BsTrash3 />
                </button>
            </div>
        </div>
    )
}

export default VagaCard