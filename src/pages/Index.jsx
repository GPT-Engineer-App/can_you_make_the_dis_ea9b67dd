import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, VStack, HStack, Icon, Input, Button, ButtonGroup } from "@chakra-ui/react";
import { FaGolfBall, FaTrophy } from "react-icons/fa";
import PlayerNameInput from "./PlayerNameInput";

const holePars = [2, 2, 3, 3, 3, 4, 3, 2, 3, 3, 2, 2, 3, 3, 2, 3, 2, 2];

const Index = () => {
  const [playerNames, setPlayerNames] = useState([""]);
  const [players, setPlayers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentHole, setCurrentHole] = useState(0);

  const startGame = () => {
    setPlayers(playerNames.map((name) => ({ name, scores: Array(18).fill(0) })));
    setGameStarted(true);
  };

  const playerInputRefs = useRef(players.map(() => React.createRef()));

  const focusNextInput = (playerIndex, holeIndex) => {
    const nextPlayerIndex = playerIndex + 1;
    const isLastPlayer = nextPlayerIndex >= players.length;
    if (isLastPlayer && holeIndex < 17) {
      playerInputRefs.current[0].current.focus();
    } else if (!isLastPlayer) {
      playerInputRefs.current[nextPlayerIndex].current.focus();
    }
  };

  const handleScoreChange = (playerIndex, holeIndex, scoreValue) => {
    const score = scoreValue === "" ? "" : Math.min(9, Math.max(0, parseInt(scoreValue, 10)));
    const newPlayers = [...players];
    newPlayers[playerIndex].scores[holeIndex] = score;
    setPlayers(newPlayers);

    if (score !== "") {
      focusNextInput(playerIndex, holeIndex);
    }

    if (newPlayers.every((player) => player.scores[holeIndex] !== 0)) {
      setCurrentHole((prevHole) => (prevHole < 17 ? prevHole + 1 : prevHole));
    }
  };
  // Remove the duplicated and incorrect logic here

  if (!gameStarted) {
    return (
      <VStack spacing={8} p={5}>
        <Box as="header" textAlign="center">
          <img src="/logo.png" alt="Queenstown Mini Golf Logo" width="150px" />
          <Heading as="h1" size="xl" mt={4}>
            Enter Player Names
          </Heading>
        </Box>
        <PlayerNameInput playerNames={playerNames} setPlayerNames={setPlayerNames} startGame={startGame} />
      </VStack>
    );
  }

  return (
    <VStack spacing={8} p={5}>
      <Heading as="h1" size="xl" textAlign="center">
        Mini Golf Score Card <FaTrophy />
      </Heading>

      <VStack width="full" mt={4}>
        <ButtonGroup isAttached variant="outline">
          <Button onClick={() => setCurrentHole(currentHole - 1)} isDisabled={currentHole === 0}>
            Previous Hole
          </Button>
          <Button onClick={() => setCurrentHole(currentHole + 1)} isDisabled={currentHole === 17}>
            Next Hole
          </Button>
        </ButtonGroup>
      </VStack>
      <Box width="full" overflowX="auto" mt={4}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th isNumeric maxW="10">
                #
              </Th>
              {players.map((player, index) => (
                <Th key={index} color="brand.800" fontWeight="bold" maxW="10ch">
                  {player.name}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td isNumeric fontWeight="bold">
                <Box>{`Hole ${currentHole + 1}`}</Box>
                <Box fontSize="sm">{`Par ${holePars[currentHole]}`}</Box>
              </Td>
              {players.map((player, playerIndex) => (
                <Td key={playerIndex} isNumeric>
                  <Input ref={playerInputRefs.current[playerIndex]} type="tel" pattern="[0-9]*" inputMode="numeric" fontWeight="bold" color="green.500" width="40px" value={player.scores[currentHole] === 0 ? "" : player.scores[currentHole]} onChange={(e) => handleScoreChange(playerIndex, currentHole, e.target.value.trim())} size="sm" max="9" borderWidth="2px" borderColor="brand.900" />
                </Td>
              ))}
            </Tr>
            {currentHole === 17 && players.every((player) => player.scores[currentHole] !== 0) && (
              <Tr>
                <Td fontWeight="bold">Final Total</Td>
                {players.map((player, index) => (
                  <Td key={index} isNumeric fontWeight="bold" color={player.scores.reduce((total, score) => total + (score === "" ? 0 : score), 0) === Math.min(...players.map((p) => p.scores.reduce((total, score) => total + (score === "" ? 0 : score), 0))) ? "green.500" : "red"}>
                    {player.scores.reduce((total, score) => total + (score === "" ? 0 : score), 0)}
                  </Td>
                ))}
              </Tr>
            )}
            <Tr>
              <Td fontWeight="bold" maxW="120px">
                Running Total
              </Td>
              {players.map((player, index) => (
                <Td key={index} isNumeric fontWeight="bold" color={player.scores.slice(0, currentHole + 1).reduce((total, score) => total + (score === "" ? 0 : score), 0) === Math.min(...players.map((p) => p.scores.slice(0, currentHole + 1).reduce((total, score) => total + (score === "" ? 0 : score), 0))) ? "green.500" : "red"}>
                  {player.scores.slice(0, currentHole + 1).reduce((total, score) => total + (score === "" ? 0 : score), 0)}
                </Td>
              ))}
            </Tr>
            {[...Array(currentHole)].map((_, index) => {
              const holeIndex = currentHole - index - 1;
              return (
                <Tr key={holeIndex}>
                  <Td isNumeric>
                    <Box>{`Hole ${holeIndex + 1}`}</Box>
                    <Box fontSize="sm">{`Par ${holePars[holeIndex]}`}</Box>
                  </Td>
                  {players.map((player, playerIndex) => (
                    <Td key={playerIndex} isNumeric color="gray.500">
                      <Input type="tel" pattern="[0-9]*" inputMode="numeric" color="gray.500" width="40px" value={player.scores[holeIndex] === 0 ? "" : player.scores[holeIndex]} onChange={(e) => handleScoreChange(playerIndex, holeIndex, e.target.value)} size="sm" max="9" />
                    </Td>
                  ))}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </VStack>
  );
};

export default Index;
