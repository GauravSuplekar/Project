package com.global.RecruitmentSystem.service;

import com.global.RecruitmentSystem.enums.ClientRequirementStatus;
import com.global.RecruitmentSystem.exceptions.ClientRequirementNotFound;
import com.global.RecruitmentSystem.model.Client;
import com.global.RecruitmentSystem.model.ClientRequirement;
import com.global.RecruitmentSystem.repository.ClientRequirementRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class ClientRequirementService {
    private final ClientRequirementRepository clientRequirementRepository;

    private final ClientService clientService;

    public ClientRequirement addRequirement(String username, ClientRequirement newClientRequirement){
        Client client = clientService.findByUsername(username);
        if (newClientRequirement.getStatus() == null) {
            newClientRequirement.setStatus(ClientRequirementStatus.OPEN);
        }
        if (newClientRequirement.getDatePosted() == null) {
            newClientRequirement.setDatePosted(LocalDate.now());
        }
        log.info("Attaching requirement to the client {}",username);
        client.addRequirement(newClientRequirement);
        log.info("Attached requirement successfully");
        return clientRequirementRepository.save(newClientRequirement);
    }

    public List<ClientRequirement> getRequirementByUsername(String username) {
        Client client = clientService.findByUsername(username);
        log.info("Getting requirements for client {}",username);
        return client.getClientRequirements();
    }

    @Transactional
    public void deleteClientRequirementById(Integer requirementId) {
        clientRequirementRepository.deleteById(requirementId);
    }

    public List<ClientRequirement> getAllClientRequirements() {
        return clientRequirementRepository.findAll();
    }

    public ClientRequirement getRequirementById(Integer requirementId) {
        return clientRequirementRepository.findById(requirementId).orElseThrow(
                () -> new ClientRequirementNotFound(requirementId)
        );
    }
}
