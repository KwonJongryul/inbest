package com.jrjr.invest.simulation.repository;

import com.jrjr.invest.simulation.document.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface NotificationRepository extends MongoRepository<Notification, String> {

}
