package com.global.RecruitmentSystem.controller;

import com.global.RecruitmentSystem.model.ClientRequirement;
import com.global.RecruitmentSystem.response.ClientRequirementCardResponse;
import com.global.RecruitmentSystem.response.ClientRequirementDetailResponse;
import com.global.RecruitmentSystem.response.ClientRequirementTableResponse;
import com.global.RecruitmentSystem.service.CandidateService;
import com.global.RecruitmentSystem.service.ClientRequirementService;
import javax.sql.rowset.serial.SerialBlob;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@AllArgsConstructor
@Slf4j
@RestController
@RequestMapping("/requirements")
@CrossOrigin(origins = {"http://localhost:3000","https://recruitment-system-frontend.onrender.com"})
public class ClientRequirementController {
    private final ClientRequirementService clientRequirementService;
    private final CandidateService candidateService;


        @PreAuthorize("hasRole('CLIENT')")
    @PostMapping(value = "/{username}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Boolean>  addRequirement(
            @PathVariable String username,
            @RequestPart("requirement") ClientRequirement newClientRequirement,
            @RequestPart(value = "requirementImage", required = false) MultipartFile requirementImage
    ) throws IOException, SQLException {
        if (requirementImage != null && !requirementImage.isEmpty()) {
            newClientRequirement.setRequirementImage(new SerialBlob(requirementImage.getBytes()));
            newClientRequirement.setRequirementImageName(requirementImage.getOriginalFilename());
            newClientRequirement.setRequirementImageType(requirementImage.getContentType());
        }
        clientRequirementService.addRequirement(username, newClientRequirement);
        return ResponseEntity.ok(true);
    }

        @PreAuthorize("hasRole('CLIENT') or hasRole('ADMIN')")
    @GetMapping("table/{username}")
    public ResponseEntity<List<ClientRequirementTableResponse>> getClientRequirementsByUsername(
            @PathVariable String username
    ){
        List<ClientRequirementTableResponse> clientRequirementTableResponses = new ArrayList<>();
        log.info("Received request for client requirements for client with username {}",username);
        List<ClientRequirement>clientRequirements = clientRequirementService
                .getRequirementByUsername(username);
        log.info("Converting ClientRequirement to ClientRequirementTableResponse");
        for(ClientRequirement clientRequirement : clientRequirements){
            ClientRequirementTableResponse clientRequirementTableResponse =
                    getClientRequirementsTableResponse(clientRequirement);
            clientRequirementTableResponses.add(clientRequirementTableResponse);
        }
        log.info("Successfully converted ClientRequirement to ClientRequirementTableResponse");
        return ResponseEntity.ok(clientRequirementTableResponses);
    }

        @PreAuthorize("hasRole('CLIENT') or hasRole('ADMIN')")
    @DeleteMapping("/{requirementId}")
    public ResponseEntity<Boolean> deleteClientRequirementById(
            @PathVariable Integer requirementId
    ){
        try{
            log.info("Received request to delete client requirement with id : {}", requirementId);
            log.info("Initiating deletion of client requirement with id : {}",requirementId);
            clientRequirementService.deleteClientRequirementById(requirementId);
            log.info("Successfully deleted client requirement with id : {}", requirementId);
            return ResponseEntity.ok(true);
        } catch (Exception exception) {
            log.error("Failed to delete client requirement with id : {}", requirementId, exception);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
        }

    }

    @GetMapping("available/{username}")
    public ResponseEntity<List<ClientRequirementCardResponse>> getClientRequirementsCardResponse(
            @PathVariable String username
    ){

        List<ClientRequirementCardResponse> availableClientRequirementCardResponses = new ArrayList<>();
        log.info("Received request for available client requirements");


        List<ClientRequirement> allClientRequirements = clientRequirementService.getAllClientRequirements();


        List<ClientRequirement> appliedClientRequirements = candidateService.getAppliedRequirements(username);

        Set<Integer> appliedRequirementIds = appliedClientRequirements.stream()
                .map(ClientRequirement::getRequirementId)
                .collect(Collectors.toSet());

        for (ClientRequirement clientRequirement : allClientRequirements) {
            if (!appliedRequirementIds.contains(clientRequirement.getRequirementId())) {
                ClientRequirementCardResponse clientRequirementCardResponse =
                        getClientRequirementsCardResponse(clientRequirement);
                availableClientRequirementCardResponses.add(clientRequirementCardResponse);
            }
        }

        log.info("Successfully filtered and converted available client requirements to ClientRequirementCardResponse");
        return ResponseEntity.ok(availableClientRequirementCardResponses);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("all")
    public ResponseEntity<List<ClientRequirementCardResponse>> getAllClientRequirements(){
        List<ClientRequirementCardResponse> allClientRequirementCardResponses = new ArrayList<>();
        log.info("Received request for all client requirements");

        List<ClientRequirement> allClientRequirements = clientRequirementService.getAllClientRequirements();

        for (ClientRequirement clientRequirement : allClientRequirements) {
            ClientRequirementCardResponse clientRequirementCardResponse =
                    getClientRequirementsCardResponse(clientRequirement);
            allClientRequirementCardResponses.add(clientRequirementCardResponse);
        }
        return ResponseEntity.ok(allClientRequirementCardResponses);
    }

    @GetMapping("detail/{requirementId}")
    public ResponseEntity<ClientRequirementDetailResponse> getClientRequirementDetail(
            @PathVariable Integer requirementId
    ){
        log.info("Received request for client requirement detail");
        ClientRequirement clientRequirement = clientRequirementService.getRequirementById(requirementId);
        log.info("Converting ClientRequirement to ClientRequirementDetailResponse");
        ClientRequirementDetailResponse clientRequirementDetailResponse =
                getClientRequirementDetailResponse(clientRequirement);
        log.info("Successfully converted ClientRequirement to ClientRequirementDetailResponse");
        return ResponseEntity.ok(clientRequirementDetailResponse);
    }

    @GetMapping("applied/{username}")
    public ResponseEntity<List<ClientRequirementCardResponse>> getAppliedRequirement(
            @PathVariable String username
    ){
        List<ClientRequirementCardResponse> clientRequirementCardResponses = new ArrayList<>();
        log.info("Received request for applied requirement for Candidate with username : {}", username);
        List<ClientRequirement> clientRequirements = candidateService.getAppliedRequirements(username);
        log.info("Converting ClientRequirement to ClientRequirementCardResponse");
        for(ClientRequirement clientRequirement : clientRequirements){
            ClientRequirementCardResponse clientRequirementCardResponse =
                    getClientRequirementsCardResponse(clientRequirement);
            clientRequirementCardResponses.add(clientRequirementCardResponse);
        }
        log.info("Successfully converted ClientRequirement to ClientRequirementCardResponse");
        return ResponseEntity.ok(clientRequirementCardResponses);
    }

    private ClientRequirementDetailResponse getClientRequirementDetailResponse(
            ClientRequirement clientRequirement
    ) {
        return new ClientRequirementDetailResponse( clientRequirement.getRequirementId(),
                clientRequirement.getTitle(), clientRequirement.getDescription(),
                clientRequirement.getStatus(), clientRequirement.getDatePosted(),
                clientRequirement.getValidTill(), clientRequirement.getMinSalary(),
                clientRequirement.getMaxSalary(), clientRequirement.getCurrency(),
                clientRequirement.getLocation(), clientRequirement.getExperienceRequired(),
                clientRequirement.getCommitmentPeriod(), clientRequirement.getSkillsRequired(),
                convertBlobToDataUrl(clientRequirement.getRequirementImage(), clientRequirement.getRequirementImageType()),
                clientRequirement.getClient().getName(),
                clientRequirement.getClient().getOrganizationName()
        );
    }

    private ClientRequirementCardResponse getClientRequirementsCardResponse(
            ClientRequirement clientRequirement
    ) {
        return new ClientRequirementCardResponse(
                clientRequirement.getRequirementId(),
                clientRequirement.getTitle(),
                clientRequirement.getClient().getOrganizationName(),
                clientRequirement.getMinSalary(),
                clientRequirement.getMaxSalary(),
                clientRequirement.getCurrency(),
                clientRequirement.getLocation(),
                convertBlobToDataUrl(clientRequirement.getRequirementImage(), clientRequirement.getRequirementImageType())
        );
    }

    private String convertBlobToDataUrl(Blob blob, String contentType) {
        if (blob == null) {
            return null;
        }
        try {
            byte[] bytes = blob.getBytes(1, (int) blob.length());
            String base64 = Base64.getEncoder().encodeToString(bytes);
            return "data:" + (contentType != null ? contentType : "application/octet-stream") + ";base64," + base64;
        } catch (SQLException e) {
            log.error("Failed to convert blob to base64", e);
            return null;
        }
    }


    // helper method to convert ClientRequirement object to ClientRequirementTableResponse object to send to frontend
    private ClientRequirementTableResponse getClientRequirementsTableResponse(
            ClientRequirement clientRequirement
    ) {
        return new ClientRequirementTableResponse(clientRequirement.getRequirementId(),
                clientRequirement.getTitle(), clientRequirement.getStatus(),
                clientRequirement.getMinSalary(), clientRequirement.getMaxSalary(),
                clientRequirement.getCurrency(), clientRequirement.getCandidateApplications().size()
        );
    }
}
