import { useState, ChangeEvent, FormEvent } from 'react';
import {  
  Container,
  Flex,
  Box,
  Stack,
  Text,
  Input,
  Image,
  Grid, 
  GridItem
} from "@chakra-ui/react";

const SearchForm = () => {
  const [formData, setFormData] = useState({
    query: '',
    books_limit: 5,
  });

  
    
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [isSubmissionError, setIsSubmissionError] = useState(false);
    
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:8000/search-books', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });


      if (!response.ok) {
        console.log(response)
        throw new Error('HTTP error! status: ${response.status}');
      }
    
      const data = await response.json();
      setSubmissionResult(data);
    } catch (error) {
      console.error({error});
      setIsSubmissionError(true);
    } finally {
      setIsSubmitting(false);
    }
  };
    
  

  return (
     <Container maxW="container.xl" pt="100px" mt="20px">
      <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px",  marginTop: '10px' }} >
              <label htmlFor="query">Describe a book to me!!</label>
                            <br />
              <Input
                type="text"
                id="query"
                name="query"
                value={formData.query}
                onChange={handleChange}
                placeholder="Describe the book here ..."
                required
                padding="10px" margin-top="5px" margin-bottom="5px"
              />
          </div>

          <div style={{ marginBottom: "20px",  marginTop: '10px' }}>
            <label  htmlFor="books_limit" style={{ marginBottom: "20px",  marginTop: '10px' }}>Number of Recommendations</label>
              <Input
                type="number"
                id="books_limit"
                name="books_limit"
                value={formData.books_limit}
                onChange={handleChange}
                required
                  style={{ marginTop: "5px" }}
              />
         
          </div>
      

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>

      {submissionResult && (
        <div style={{ marginBottom: "20px",  marginTop: '10px' }}>
                
                  <Flex>        
                  

                  <Flex mt="10">
                    <Stack gap={5}>
                        <Box key="message-1" p={1} shadow="sm" mt="5" flexDirection="column">
                            {isSubmissionError ? (
                                  <h2 style={{color:'Tomato', fontSize: '1.5em'}}>We're sorry, we are unable to process the request due a error</h2>                       
                              ) : (
                                <div>  
                                 { submissionResult["books"].length == 0 && (<h2 style={{color:'Tomato', fontSize: '1.5em'}}>Found {submissionResult["books"].length} books. Describe the book another way or another book!</h2>     )}
                                { submissionResult["books"].length > 0 && (<h2 style={{color:'Blue', fontSize: '1.5em'}}>Found {submissionResult["books"].length} books. Below are the top recommendations for you:</h2>)}
                                </div>
                              )
                              }
                        </Box>
                      {submissionResult["books"].map((book) => (           
                          <Box key={book.id} p={1} shadow="sm" mt="5" flexDirection="column">
                             <Grid
                              h="400px"
                              templateRows="repeat(2, 1fr)"
                              templateColumns="repeat(5, 1fr)"
                              gap={4}
                            > 
                                 <GridItem rowSpan={2} colSpan={1}>
                                     <Box >
                                         <Image key="{book.id}" src={!book.cover_image_url.includes("nocover-M")? book.cover_image_url : "https://www.press.uillinois.edu/books/images/no_cover.jpg"} ></Image>
                                    </Box>
                                 </GridItem>
                                <GridItem colSpan={4}>
                                    <Flex justify="space-between" flexDirection="column">
                                        <Box>
                                            <Text mt={4} as="div">
                                                <b>Title:</b> {book.title}
                                            </Text>
                                            <Text mt={2} as="div">
                                                <b>Authors:</b> { book.author_name.join(", ")}
                                            </Text>
                                            <Text mt={2} as="div">
                                                <b>Cover Edition:</b> { book.cover_edition_key}
                                            </Text>
                                            <Text mt={2} as="div">
                                                <b>First Published Year:</b> { book.first_publish_year}
                                            </Text>
                                        </Box>
                                </Flex>
                                </GridItem>
                                 <GridItem colSpan={4}>
                                        <Text mt={4} as="div">
                                            <Box>
                                                <b>Brief Summary:</b>{book.summary}
                                            </Box>
                                            
                                        </Text>
                                </GridItem>
                            </Grid>     
                            
                          </Box>
                          ))}
                     </Stack> 
                  </Flex>

            </Flex>
                                    
        </div>
      )}
    </form> 
  </Container> 
    
  );
}

export default SearchForm;