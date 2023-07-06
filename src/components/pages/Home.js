import { useState, useEffect } from 'react'

import Container from '../layout/Container'

import LinkButton from '../layout/LinkButton'
import styles from './Home.module.css'
import CompanyCard from '../companies/CompanyCard'

import 'react-loading-skeleton/dist/skeleton.css'

import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import SkeletonCompanyCard from '../companies/SkeletonCompanyCard'

function Home() {

    const [companies, setCompanies] = useState([])
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
                    setCompanies(data)
                    setRemoveLoading(true)
                })
                .catch((err) => console.log(err))
        }, 1000)
    }, [])

    function removeCompany(id) {

        const formData = new FormData();
        formData.append('id', id);
        const newCompanies = {};

        fetch(`http://localhost:5000/empresa?id=${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'applicatin/json'
            },
        })
            .then(resp => resp.json())
            .then(() => {
                const asArray = companies.empresas
                const filtered = asArray.filter((company) => company.id !== id)
                newCompanies.empresas = filtered
                toast.success('Empresa removida com sucesso.')
                setCompanies(newCompanies)
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
                    <h1>Bem-vindo ao <span>Vagas</span></h1>
                    <h3>Empresas cadastradas</h3>
                </div>
                <div className={styles.button_container}>
                    <LinkButton to="/newcompany" text="Cadastrar Empresa" ></LinkButton>
                </div>
            </section>

            <Container customClass="start">
                {!removeLoading ? <SkeletonCompanyCard cards={20} /> :
                    <>
                        {companies.empresas &&
                            companies.empresas.map(company => {
                                return <CompanyCard
                                    id={company.id}
                                    nome={company.nome}
                                    ramo_atuacao={company.ramo_atuacao}
                                    link={company.link}
                                    tamanho={company.tamanho}
                                    vagas={company.vagas}
                                    key={company.id}
                                    handleRemove={removeCompany}
                                />;
                            })}
                    </>
                }
            </Container>


            {removeLoading && !companies.empresas && (
                <p>Não há empresas cadastradas.</p>
            )}

        </motion.div >
    )
}

export default Home