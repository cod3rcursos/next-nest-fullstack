'use client'
import { useEffect, useState } from 'react'

export default function Home() {
    const [produto, setProduto] = useState<any>({})
    const [produtos, setProdutos] = useState<any>([])

    useEffect(() => {
        obterProdutos()
    }, [])

    async function obterProdutos() {
        const resp = await fetch('http://localhost:3001/produtos')
        const produtos = await resp.json()
        setProdutos(produtos)
    }

    async function criarProduto() {
        await fetch('http://localhost:3001/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(produto),
        })
        setProduto({})
        await obterProdutos()
    }

    async function alterarProduto() {
        await fetch(`http://localhost:3001/produtos/${produto.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(produto),
        })
        setProduto({})
        await obterProdutos()
    }

    async function obterProdutoPorId(id: number) {
        const resp = await fetch(`http://localhost:3001/produtos/${id}`)
        const produto = await resp.json()
        setProduto(produto)
    }

    async function excluirProduto(id: number) {
        await fetch(`http://localhost:3001/produtos/${id}`, {
            method: 'DELETE',
        })
        await obterProdutos()
    }

    function renderizarFormProduto() {
        return (
            <div className="flex gap-5 items-end">
                <div className="flex flex-col">
                    <label htmlFor="nome">Nome</label>
                    <input
                        id="nome"
                        type="text"
                        value={produto.nome ?? ''}
                        onChange={(e) => setProduto({ ...produto, nome: e.target.value })}
                        className="bg-zinc-700 p-2 rounded-md"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="descricao">Descrição</label>
                    <input
                        id="descricao"
                        type="text"
                        value={produto.descricao ?? ''}
                        onChange={(e) => setProduto({ ...produto, descricao: e.target.value })}
                        className="bg-zinc-700 p-2 rounded-md"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="preco">Preço</label>
                    <input
                        id="preco"
                        type="number"
                        value={produto.preco ?? ''}
                        onChange={(e) => setProduto({ ...produto, preco: +e.target.value })}
                        className="bg-zinc-700 p-2 rounded-md"
                    />
                </div>
                <div>
                    {produto.id ? (
                        <button
                            onClick={alterarProduto}
                            className="bg-blue-500 px-4 py-2 rounded-md"
                        >
                            Alterar Produto
                        </button>
                    ) : (
                        <button onClick={criarProduto} className="bg-blue-500 px-4 py-2 rounded-md">
                            Criar Produto
                        </button>
                    )}
                </div>
            </div>
        )
    }

    function renderizarProdutos() {
        return (
            <div className="flex flex-col gap-2">
                {produtos.map((produto: any) => (
                    <div
                        key={produto.id}
                        className="flex items-center gap-2 bg-zinc-800 px-4 py-2 rounded-md"
                    >
                        <div className="flex-1">{produto.nome}</div>
                        <div>{produto.preco}</div>
                        <div>
                            <button
                                onClick={() => obterProdutoPorId(produto.id)}
                                className="bg-green-500 p-2 rounded-md"
                            >
                                Alterar
                            </button>
                            <button
                                onClick={() => excluirProduto(produto.id)}
                                className="bg-red-500 p-2 rounded-md"
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen gap-10">
            {renderizarFormProduto()}
            {renderizarProdutos()}
        </div>
    )
}
