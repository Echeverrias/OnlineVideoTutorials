package org.jaea.onlinevideotutorials.repositories;

import org.jaea.onlinevideotutorials.domain.ParticipantSession;

import org.springframework.data.repository.CrudRepository;

public interface ParticipantSessionRepository extends CrudRepository<ParticipantSession,Long>{

    public ParticipantSession findByUserName(String userName);

    public ParticipantSession findByEmail(String email);
    
    public ParticipantSession findByUserImageId(Long id);
}
