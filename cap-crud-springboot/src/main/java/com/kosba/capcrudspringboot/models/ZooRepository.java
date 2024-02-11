package com.kosba.capcrudspringboot.models;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ZooRepository extends JpaRepository<Zoo, Long> {


}
