import styles from './Company.module.css'

import { toast } from 'react-toastify';

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { motion } from 'framer-motion'

import SkeletonVagaCard from '../vagas/SkeletonVagaCard'

import CompanyForm from '../companies/CompanyForm'
import Container from '../layout/Container'
import VagaForm from '../vagas/VagaForm'
import VagaCard from '../vagas/VagaCard'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

function Company() {

    const { id } = useParams()

    const [company, setCompany] = useState([])
    const [allVagas, setAllVagas] = useState([])
    const [showCompanyForm, setShowCompanyForm] = useState(false)
    const [showVagaForm, setShowVagaForm] = useState(false)

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
                    setCompany(data)
                    setAllVagas(data.vagas)
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
                setCompany(data)
                setAllVagas(data.vagas)
            })
            .catch((err) => (console.log(err)))

    }

    function removeVaga(id) {
        const formData = new FormData();
        formData.append('id', id);

        fetch(`http://localhost:5000/vaga?id=${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'applicatin/json'
            },
        })
            .then(resp => resp.json())
            .then(() => {
                setAllVagas(allVagas.filter((vaga) => vaga.id !== id))
                toast.success('Empresa removida com sucesso.')
                updatePageData()
            })
            .catch(err => console.log(err))
    }

    function toggleCompanyForm() {
        setShowCompanyForm(!showCompanyForm)
    }

    function toggleVagaForm() {
        setShowVagaForm(!showVagaForm)
    }

    function editPost(company) {

        const formData = new FormData();
        formData.append('id', company.id);
        formData.append('nome', company.nome);
        formData.append('ramo_atuacao', company.ramo_atuacao);
        formData.append('sobre', company.sobre);
        formData.append('link', company.link);
        formData.append('tamanho', company.tamanho);


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
                setCompany(data)
                toast.success('Empresa alterada com sucesso.')
                setShowCompanyForm(false)
            })
            .catch(err => console.log(err))


    }

    function createVaga(vaga) {

        const formData = new FormData();
        formData.append('empresa_id', company.id)
        formData.append('cargo', vaga.cargo);
        formData.append('conhecimentos', vaga.conhecimentos);
        formData.append('descricao', vaga.descricao);
        formData.append('modalidade_contrato', vaga.modalidade_contrato);
        formData.append('modalidade_trabalho', vaga.modalidade_trabalho);
        formData.append('responsabilidades', vaga.responsabilidades);

        fetch("http://localhost:5000/vaga",
            {
                method: "POST",
                // headers: {
                //     'Content-Type': 'application/json'
                // },
                body: formData,
            })
            .then((resp) => resp.json())
            .then((data) => {
                toast.success('Vaga cadastrada com sucesso.')
                setShowVagaForm(false)
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
            <div className={styles.company_details}>
                <div className={styles.details_container}>
                    <div className={styles.company_name}>
                        <h1>
                            {company.nome ? company.nome :
                                (<SkeletonTheme baseColor='#5e35b1' highlightColor='#7a5a8f'>
                                    <h4><Skeleton /></h4>
                                </SkeletonTheme>)
                            }
                        </h1>
                        <button className={styles.btn} onClick={toggleCompanyForm}>
                            {!showCompanyForm ? "Editar empresa" : 'Cancelar'}
                        </button>
                    </div>
                    {!showCompanyForm ?
                        (
                            company.nome ?
                                (
                                    <div className={styles.company_info}>
                                        <p><span>Área de atuação: </span>{company.ramo_atuacao}</p>
                                        <p><span>Descrição: </span>{company.sobre}</p>
                                        <p><span>Website: </span><a href={company.link}>{company.link}</a></p>
                                        <p><span>Funcionários: </span>{company.tamanho}</p>
                                        <p><span>Vagas: </span>{(company.vagas).length}</p>
                                    </div>
                                )
                                :
                                (
                                    <div className={styles.company_info}>
                                        <p><Skeleton /></p>
                                        <p><Skeleton /></p>
                                        <p><Skeleton /></p>
                                        <p><Skeleton /></p>
                                        <p><Skeleton /></p>
                                    </div>
                                )
                        ) : (
                            <div className={styles.company_info}>
                                <CompanyForm handleSubmit={editPost} btnText='Salvar' companyData={company} />
                            </div>
                        )
                    }
                </div>
                <div className={styles.vaga_form_container}>
                    <h2>Vagas da empresa</h2>
                    <button className={styles.btn} onClick={toggleVagaForm}>
                        {!showVagaForm ? "Adicionar vaga" : 'Cancelar'}
                    </button>
                    <div className={styles.company_info}>
                        {showVagaForm && (
                            <VagaForm handleSubmit={createVaga}
                                textBtn={"Salvar"} />
                        )}
                    </div>
                    <Container customClass="start">
                        {company.nome ?
                            (
                                company.vagas.length > 0 ?
                                    allVagas.map((vaga) => (
                                        <VagaCard
                                            id={vaga.id}
                                            key={vaga.id}
                                            cargo={vaga.cargo}
                                            modalidade_trabalho={vaga.modalidade_trabalho}
                                            modalidade_contrato={vaga.modalidade_contrato}
                                            descricao={vaga.descricao}
                                            handleRemove={removeVaga}
                                        />
                                    ))
                                    : (<p>Não há vagas cadastradas.</p>)
                            ) : (
                                <SkeletonVagaCard cards={10} />
                            )}



                    </Container>
                </div>
            </div >


        </motion.div>
    )
}

export default Company