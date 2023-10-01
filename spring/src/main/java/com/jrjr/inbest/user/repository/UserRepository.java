package com.jrjr.inbest.user.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.jrjr.inbest.user.dto.ParticipantDTO;
import com.jrjr.inbest.user.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByEmail(String email);

	Boolean existsByEmail(String email);

	Boolean existsByNickname(String nickname);

	@Query("SELECT NEW com.jrjr.inbest.user.dto.ParticipantDTO(u.nickname, u.profileImgSearchName) "
		+ "FROM User u "
		+ "JOIN SimulationUser su "
		+ "ON u.seq = su.user.seq "
		+ "WHERE su.simulation.seq = :simulationSeq")
	List<ParticipantDTO> getParticipantsBySimulationSeq(@Param("simulationSeq") Long simulationSeq);
}
