import styles from './Category.module.css'

import { toast } from 'react-toastify';

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { motion } from 'framer-motion'

import SkeletonVinhoCard from '../vinhos/SkeletonVinhoCard'

import CategoryForm from '../categories/CategoryForm'
import Container from '../layout/Container'
import VinhoForm from '../vinhos/VinhoForm'
import VinhoCard from '../vinhos/VinhoCard'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

function Category() {

    const { id } = useParams()

    const [Category, setCategory] = useState([])
    const [allVinhos, setAllVinhos] = useState([])
    const [showCategoryForm, setShowCategoryForm] = useState(false)
    const [showVinhoForm, setShowVinhoForm] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/empresa?id=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(resp => resp.json())
                .then((data) => {
                    setCategory(data)
                    setAllVinhos(data.vinhos)
                })
                .catch((err) => (console.log(err)))

        }, 500);
    }, [id])

    function updatePageData() {
        fetch(`http://localhost:5000/empresa?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(resp => resp.json())
            .then((data) => {
                setCategory(data)
                setAllVinos(data.vinhos)
            })
            .catch((err) => (console.log(err)))

    }

    function removeVinho(id) {
        const formData = new FormData();
        formData.append('id', id);

        fetch(`http://localhost:5000/Vinho?id=${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'applicatin/json'
            },
        })
            .then(resp => resp.json())
            .then(() => {
                setAllVinhos(allVinhos.filter((Vinho) => Vinho.id !== id))
                toast.success('Empresa removida com sucesso.')
                updatePageData()
            })
            .catch(err => console.log(err))
    }

    function toggleCategoryForm() {
        setShowCategoryForm(!showCategoryForm)
    }

    function toggleVinhoForm() {
        setShowVinhoForm(!showVinhoForm)
    }

    function editPost(Category) {

        const formData = new FormData();
        formData.append('id', Category.id);
        formData.append('nome', Category.nome);
        formData.append('ramo_atuacao', Category.ramo_atuacao);
        formData.append('sobre', Category.sobre);
        formData.append('link', Category.link);
        formData.append('tamanho', Category.tamanho);


        fetch("http://localhost:5000/empresa",
            {
                method: "PUT",
                // headers: {
                //     'Content-Type': 'application/json'
                // },
                body: formData,
            })
            .then((resp) => resp.json())
            .then((data) => {
                setCategory(data)
                toast.success('Empresa alterada com sucesso.')
                setShowCategoryForm(false)
            })
            .catch(err => console.log(err))


    }

    function createVinho(Vinho) {

        const formData = new FormData();
        formData.append('empresa_id', Category.id)
        formData.append('cargo', Vinho.cargo);
        formData.append('conhecimentos', Vinho.conhecimentos);
        formData.append('descricao', Vinho.descricao);
        formData.append('modalidade_contrato', Vinho.modalidade_contrato);
        formData.append('modalidade_trabalho', Vinho.modalidade_trabalho);
        formData.append('responsabilidades', Vinho.responsabilidades);

        fetch("http://localhost:5000/Vinho",
            {
                method: "POST",
                // headers: {
                //     'Content-Type': 'application/json'
                // },
                body: formData,
            })
            .then((resp) => resp.json())
            .then((data) => {
                toast.success('Vinho cadastrada com sucesso.')
                setShowVinhoForm(false)
                updatePageData()
                console.log(...formData)
            })
            .catch(err => console.log(err))
    }

    return (
        <motion.div
            inition={{ width: 0 }}
            animate={{ width: "100%" }}
            exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
        >
            <div className={styles.Category_details}>
                <div className={styles.details_container}>
                    <div className={styles.Category_name}>
                        <h1>
                            {Category.nome ? Category.nome :
                                (<SkeletonTheme baseColor='#5e35b1' highlightColor='#7a5a8f'>
                                    <h4><Skeleton /></h4>
                                </SkeletonTheme>)
                            }
                        </h1>
                        <button className={styles.btn} onClick={toggleCategoryForm}>
                            {!showCategoryForm ? "Editar empresa" : 'Cancelar'}
                        </button>
                    </div>
                    {!showCategoryForm ?
                        (
                            Category.nome ?
                                (
                                    <div className={styles.Category_info}>
                                        <p><span>Área de atuação: </span>{Category.ramo_atuacao}</p>
                                        <p><span>Descrição: </span>{Category.sobre}</p>
                                        <p><span>Website: </span><a href={Category.link}>{Category.link}</a></p>
                                        <p><span>Funcionários: </span>{Category.tamanho}</p>
                                        <p><span>Vinhos: </span>{(Category.vinhos).length}</p>
                                    </div>
                                )
                                :
                                (
                                    <div className={styles.Category_info}>
                                        <p><Skeleton /></p>
                                        <p><Skeleton /></p>
                                        <p><Skeleton /></p>
                                        <p><Skeleton /></p>
                                        <p><Skeleton /></p>
                                    </div>
                                )
                        ) : (
                            <div className={styles.Category_info}>
                                <CategoryForm handleSubmit={editPost} btnText='Salvar' CategoryData={Category} />
                            </div>
                        )
                    }
                </div>
                <div className={styles.Vinho_form_container}>
                    <h2>Vinhos da empresa</h2>
                    <button className={styles.btn} onClick={toggleVinhoForm}>
                        {!showVinhoForm ? "Adicionar Vinho" : 'Cancelar'}
                    </button>
                    <div className={styles.Category_info}>
                        {showVinhoForm && (
                            <VinhoForm handleSubmit={createVinho}
                                textBtn={"Salvar"} />
                        )}
                    </div>
                    <Container customClass="start">
                        {Category.nome ?
                            (
                                Category.vinhos.length > 0 ?
                                    allVinhos.map((Vinho) => (
                                        <VinhoCard
                                            id={Vinho.id}
                                            key={Vinho.id}
                                            cargo={Vinho.cargo}
                                            modalidade_trabalho={Vinho.modalidade_trabalho}
                                            modalidade_contrato={Vinho.modalidade_contrato}
                                            descricao={Vinho.descricao}
                                            handleRemove={removeVinho}
                                        />
                                    ))
                                    : (<p>Não há vinhos cadastradas.</p>)
                            ) : (
                                <SkeletonVinhoCard cards={10} />
                            )}



                    </Container>
                </div>
            </div >


        </motion.div>
    )
}

export default Category