package com.jrjr.inbest.user.dto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
public class SimulationRecordDTO {

	@Schema(description = "시뮬레이션 pk 값")
	Long simulationSeq;

	@Schema(description = "시뮬레이션 이름")
	String title;

	@Schema(description = "시뮬레이션 시작일")
	String startDate;

	@Schema(description = "시뮬레이션 종료일")
	String finishedDate;

	@Schema(description = "시뮬레이션 기간")
	Integer period;

	@Schema(description = "시뮬레이션 참가자 인원 수")
	Integer memberNum;

	@Schema(description = "내 랭킹")
	Integer rank;

	@Schema(description = "내 수익률")
	Integer rate;

	@Schema(description = "티어 변화량")
	Integer tier;

	@Schema(description = "자주 투자한 산업군 3가지")
	List<String> industries;

	@Schema(description = "시뮬레이션에 참가한 참가자 정보")
	List<ParticipantDTO> participants;

	public SimulationRecordDTO(Long simulationSeq, String title, LocalDateTime startDate, LocalDateTime finishedDate,
		Integer period,
		Integer memberNum, Integer rank, Integer rate, Integer tier) {
		this.simulationSeq = simulationSeq;
		this.title = title;
		this.startDate = startDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
		this.finishedDate = finishedDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
		this.period = period;
		this.memberNum = memberNum;
		this.rank = rank;
		this.rate = rate;
		this.tier = tier;
	}
}
