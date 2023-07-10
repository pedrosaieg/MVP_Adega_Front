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
            fetch('http://localhost:5000/categorias', {
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

        fetch(`http://localhost:5000/categoria?id=${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'applicatin/json'
            },
        })
            .then(resp => resp.json())
            .then(() => {
                const asArray = categories.categorias
                const filtered = asArray.filter((category) => category.id !== id)
                newCategories.categorias = filtered
                toast.success('Categoria removida com sucesso.')
                setCategories(newCategories)
            })
            .catch(err => console.log(err))
    }

    return (
        <motion.div
            inition={{ width: 0 }}
            animate={{ width: "100%" }}
            exit={{ x: window.innerWidth, transition: { duration: 0.2 } }}
        >
            <div className={styles.background}>
                <div className={styles.divider}>
                    <div className={styles.left}>
                        <div className={styles.categories_banner}>
                            <h1>olá, Pedro Saieg</h1>
                            <h1> este é o resumo da sua adega</h1>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.button_container}>
                            <LinkButton to="/newcategory" text="Nova categoria"></LinkButton>
                        </div>
                        <Container customClass="start">
                            {!removeLoading ? <SkeletonCategoryCard cards={3} /> :
                                <>
                                    {categories.categorias &&
                                        categories.categorias.map(category => {
                                            return <CategoryCard
                                                id={category.id}
                                                nome={category.nome}
                                                pais={category.pais}
                                                descricao={category.descricao}
                                                vinhos={category.vinhos}
                                                key={category.id}
                                                handleRemove={removeCategory}
                                            />;
                                        })}
                                </>
                            }
                        </Container>


                        {removeLoading && !categories.categories && (
                            <p>Você ainda não cadastrou nenhuma categoria.</p>
                        )}
                    </div>

                </div>
            </div>
        </motion.div >
    )
}

export default Categories