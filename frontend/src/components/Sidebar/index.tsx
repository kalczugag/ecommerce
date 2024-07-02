import {
    styled,
    Accordion as MuiAccordion,
    AccordionProps,
    AccordionSummary,
    AccordionDetails,
    Divider,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    "&:not(:last-child)": {
        borderBottom: 0,
    },
    "&::before": {
        display: "none",
    },
}));

const Sidebar = () => {
    return (
        <div className="flex flex-col space-y-6 mr-8 z-10">
            <h3 className="text-lg text-gray-500 font-semibold">Filters</h3>
            <div className="border-gray-500">
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        Color
                    </AccordionSummary>
                    <AccordionDetails></AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        Size
                    </AccordionSummary>
                    <AccordionDetails></AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        Price
                    </AccordionSummary>
                    <AccordionDetails></AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        Discount Range
                    </AccordionSummary>
                    <AccordionDetails></AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        Availability
                    </AccordionSummary>
                    <AccordionDetails></AccordionDetails>
                </Accordion>
            </div>
        </div>
    );
};

export default Sidebar;
