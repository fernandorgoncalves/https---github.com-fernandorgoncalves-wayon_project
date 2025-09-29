package com.wayon.satf.resorces;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.wayon.satf.entities.Transfer;
import com.wayon.satf.services.TransferService;

@RestController
@RequestMapping(value = "/transfers")
public class TransferResorce {
	
	@Autowired
	public TransferService service;
	
	@PostMapping
	public ResponseEntity<Transfer> schedule(@RequestBody Transfer transfer) {
		Transfer newTransfer = service.scheduleTransfer(transfer);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(newTransfer.getId())
				.toUri();
		return ResponseEntity.created(uri).body(newTransfer);
	}
	
	@GetMapping
	public ResponseEntity<List<Transfer>> findAll(){
		List<Transfer> list = service.findAll();
		return ResponseEntity.ok().body(list);


		
	}
	@GetMapping(value = "/{id}")
	public ResponseEntity<Transfer> findByIs(@PathVariable Long id){
		Transfer obj = service.findById(id);
		return ResponseEntity.ok().body(obj);
	}


	/*@PostMapping
	public ResponseEntity<Transfer> schedule(@RequestBody Transfer transfer) {
		Transfer newTransfer = service.scheduleTransfer(transfer);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(newTransfer.getId()).toUri();
		return ResponseEntity.created(uri).body(newTransfer);
	}*/
}