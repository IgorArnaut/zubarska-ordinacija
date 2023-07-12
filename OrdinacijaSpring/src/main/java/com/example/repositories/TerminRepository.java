package com.example.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import model.Termin;

public interface TerminRepository extends JpaRepository<Termin, Integer> {

}
