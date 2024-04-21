import React from "react";
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, VStack } from "@chakra-ui/react";

const FinalScores = ({ players, holePars }) => {
  return (
    <VStack spacing={8} p={5}>
      <Heading as="h1" size="xl" textAlign="center">
        Final Scores
      </Heading>
      <Box width="full" overflowX="auto" mt={4}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th isNumeric>#</Th>
              {players.map((player, index) => (
                <Th key={index} color="brand.800" fontWeight="bold">
                  {player.name}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {holePars.map((par, index) => (
              <Tr key={index}>
                <Td isNumeric fontWeight="bold">{`Hole ${index + 1}`}</Td>
                <Td fontWeight="bold">{`Par ${par}`}</Td>
                {players.map((player, playerIndex) => (
                  <Td key={playerIndex} isNumeric>
                    {player.scores[index]}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </VStack>
  );
};

export default FinalScores;
