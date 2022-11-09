package br.com.aws.msproduto.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.aws.msproduto.entity.Produto;
import br.com.aws.msproduto.service.impl.ProdutoService;

@RestController
@RequestMapping("/api/produto")
public class ProdutoController {

	@Autowired
	private ProdutoService service;

	
	
	@GetMapping
	public ResponseEntity<List<Produto>> buscarTodos(){
		return ResponseEntity.ok(service.buscarTodos());
	}
	
	@PostMapping
	public ResponseEntity<Produto> salvar(@RequestBody Produto produto){
		var novoObj = service.salvar(produto);
		return new ResponseEntity(novoObj, HttpStatus.CREATED);
	}
	
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delet(@PathVariable Long id){
		service.delete(id);
		return ResponseEntity.ok().build();
	}
	
}
