import { Card, Heading, Image, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

export default function Books({ id, title, author, image, publisher, year }) {
  return (
    <Link href={`/detail/${id}`}>
      <Card
        key={id}
        my={4}
        p={4}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="lg"
        transition="transform 0.2s"
        _hover={{ transform: "scale(1.05)" }}
        bgColor="white" 
        
      >
        <VStack spacing={2} align="start"> 
          <Heading size="md" color="purple.700"> 
            {title} ({year})
          </Heading>
          <Text fontSize="sm" color="gray.600" >
            {author}
          </Text>
          <Image w="full" h={40} objectFit="cover" src={`${image}`} alt={`${id}-${title}`} mb={2} borderRadius="md" /> {/* Tambahkan border radius */}
          <Text fontSize="sm" color="gray.700" >
            <span style={{ fontWeight: "bold" }}>Publisher:</span> {publisher}
          </Text>
        </VStack>
      </Card>
    </Link>
  );
}
