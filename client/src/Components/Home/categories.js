import { Link } from "react-router-dom";
import { categories } from "../../constants/data";
import { Button, Table, TableHead, TableRow, TableCell, TableBody, styled } from '@mui/material';

const StyledTable = styled(Table)`
    border: 1px solid rgba(224, 224, 224, 1);
`;

const StyledButton = styled(Button)`
    margin: 20px;
    width: 85%;
    background: #6495ED;
    color: #fff;
    text-decoration: none;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

const Categories = () => {

  return (
    <>
      <Link to={`/create`} style={{ textDecoration: "none" }}>
        <StyledButton variant="contained" >Create Blog</StyledButton>
      </Link>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>
              <StyledLink to={"/"}>
                All Categories
              </StyledLink>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>
                <StyledLink to={`/?category=${category.type}`}>
                  {category.type}
                </StyledLink>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </>
  );
};

export default Categories;
