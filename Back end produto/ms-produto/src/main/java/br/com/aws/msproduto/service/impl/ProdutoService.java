package br.com.aws.msproduto.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.aws.msproduto.entity.Produto;
import br.com.aws.msproduto.repository.ProdutoRepository;

@Service
public class ProdutoService {
	
	@Autowired
	private ProdutoRepository repository;
	
	public List<Produto> buscarTodos() {
		return repository.findAll();
	}
	
	public Produto salvar(Produto obj) {
		return repository.save(obj);
	}
	
	public void delete(Long id) {
		try {
			repository.deleteById(id);
		} catch (Exception e) {
			throw new RuntimeException("Ocorreu um erro ao excluir o produto");
		}
		
	}
	

}
