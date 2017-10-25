package org.jaea.onlinevideotutorials.repositories;

import org.jaea.onlinevideotutorials.domain.Room;
import org.springframework.data.repository.CrudRepository;

public interface RoomRepository extends CrudRepository<Room, Long>{
    public Room findByName(String name);
}