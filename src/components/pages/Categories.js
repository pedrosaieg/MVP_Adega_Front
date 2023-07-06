import { useState, useEffect } from 'react'

import Container from '../layout/Container'

import LinkButton from '../layout/LinkButton'
import styles from './Categories.module.css'
import CategoryCard from '../categories/CategoryCard'

import 'react-loading-skeleton/dist/skeleton.css'

import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import SkeletonCategoryCard from '../categories/SkeletonCategoryCard'

function Categories() {

    const [categories, setCategories] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:5000/empresas', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((resp) => resp.json())
                .then((data) => {
                    setCategories(data)
                    setRemoveLoading(true)
                })
                .catch((err) => console.log(err))
        }, 1000)
    }, [])

    function removeCategory(id) {

        const formData = new FormData();
        formData.append('id', id);
        const newCategories = {};

        fetch(`http://localhost:5000/empresa?id=${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'applicatin/json'
            },
        })
            .then(resp => resp.json())
            .then(() => {
                const asArray = Categories.categories
                const filtered = asArray.filter((category) => category.id !== id)
                newCategories.categories = filtered
                toast.success('Categoria removida com sucesso.')
                setCategories(newCategories)
            })
            .catch(err => console.log(err))
    }

    return (
        <motion.div
            inition={{ width: 0 }}
            animate={{ width: "100%" }}
            exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
        >
            <section className={styles.top_container}>
                <div>
                    <h1>Bem-vindo ao <span>Minha adega</span></h1>
                    <h3>Suas categorias</h3>
                </div>
                <div className={styles.button_container}>
                    <LinkButton to="/newcategory" text="Nova categoria"></LinkButton>
                </div>
            </section>

            <Container customClass="start">
                {!removeLoading ? <SkeletonCategoryCard cards={20} /> :
                    <>
                        {categories.categories &&
                            categories.categories.map(category => {
                                return <CategoryCard
                                    id={category.id}
                                    nome={category.nome}
                                    ramo_atuacao={category.ramo_atuacao}
                                    link={category.link}
                                    tamanho={category.tamanho}
                                    vinhos={category.vinhos}
                                    key={category.id}
                                    handleRemove={removeCategory}
                                />;
                            })}
                    </>
                }
            </Container>


            {removeLoading && !categories.categories && (
                <p>Não há categorias cadastradas.</p>
            )}

        </motion.div >
    )
}

export default Categories