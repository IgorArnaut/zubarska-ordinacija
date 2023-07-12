package com.example.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.repositories.PacijentRepository;
import com.example.repositories.TerminRepository;

import model.Pacijent;
import model.Termin;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class TerminController {
	
	@Autowired
	private PacijentRepository pr;
	@Autowired
	private TerminRepository tr;
	
	@GetMapping("/termini")
	public List<Termin> vratiSveTermine() {
		return tr.findAll();
	}
	
	@GetMapping("/termini/{jmbg}")
	public List<Termin> vratiTerminePacinenta(@PathVariable("jmbg") String jmbg) {
		Pacijent pacijent = pr.findById(jmbg).get();
		return pacijent.getTermins();
	}
	
	@PostMapping("/termini")
	public Termin postaviTermin(@RequestBody Termin termin) {
		if (!pr.findAll().contains(termin.getPacijent()))
			pr.save(termin.getPacijent());
			
		return tr.save(termin);
	}
	
	@DeleteMapping("/termini/{id}")
	public void otkaziTermin(@PathVariable("id") Integer id) {
		Termin termin = tr.findById(id).get();
		tr.delete(termin);
	}

}
