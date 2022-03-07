import { Grid, Box, TextField, Button } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { FormTypes } from '../..';
import { useStyles } from './styles';
import * as Yup from 'yup';

type Props = {
	onSubmit: (values: FormTypes, props: any) => void;
};

const ConverterForm = (props: Props) => {
	const classes = useStyles();

	const initialValues: FormTypes = {
		currencyConversion: '',
	};

	const validationSchema = Yup.object().shape({
		currencyConversion: Yup.string().required('Required'),
	});

	return (
		<Formik initialValues={initialValues} onSubmit={props.onSubmit} validationSchema={validationSchema}>
			{(props) => (
				<Form className={classes.formContainer}>
					<Grid item container>
						<Box>
							<Field as={TextField} name='currencyConversion' placeholder='Enter currency' fullWidth required />
						</Box>

						<Button className={classes.formButton} type='submit' variant='contained' disabled={props.isSubmitting}>
							{props.isSubmitting ? 'Loading' : 'Convert'}
						</Button>
					</Grid>
					{props.errors.currencyConversion || props.touched.currencyConversion ? (
						<Box className={classes.formError}>{props.errors.currencyConversion}</Box>
					) : null}
				</Form>
			)}
		</Formik>
	);
};

export default ConverterForm;
