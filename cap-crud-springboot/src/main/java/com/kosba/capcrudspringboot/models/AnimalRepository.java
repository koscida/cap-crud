package com.kosba.capcrudspringboot.models;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Long> {

    Optional<List<Animal>> findByZooId(Long zooId);

    Optional<List<Animal>> findByZooIdAndBirthDay(Long zooId, int birthDay);

}
