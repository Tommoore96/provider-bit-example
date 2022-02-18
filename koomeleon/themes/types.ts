export interface ExportedDefaultTheme {
  colors: ColorTypes;
  fonts: FontsType;
  content: ContentType;
  assets: AssetsType;
  globals?: {
    focusVisible?: {
      boxShadow?: string;
    };
  };
}

interface ContentType {
  borderRadius: DefaultComponentComposition;
}

interface DefaultComponentComposition {
  button?: string;
  radioButton?: string;
  inputField?: string;
  progressBar?: string;
  errorMessage?: string;
  toggle?: string;
  header?: string;
}

interface AssetsType {
  icons?: {
    error?: () => JSX.Element;
    messageCard?: () => JSX.Element;
  };
}

interface GenericComponentType {
  button?: GenericComponentComposition;
  radioButton?: GenericComponentComposition;
  inputField?: StateType;
  progressBar?: GenericComponentComposition;
  errorMessage?: GenericComponentComposition;
  toggle?: GenericComponentComposition;
  header?: GenericComponentComposition;
  summaryCard?: string;
  messageCard?: string;
}

interface ColorTypes {
  background: BackgroundColorComponentType;
  text: TextColorComponentType;
  border?: GenericComponentType;
  boxShadow: GenericComponentType;
}

interface BackgroundColorComponentType {
  button: GenericComponentComposition;
  radioButton: GenericComponentComposition;
  inputField?: StateType;
  progressBar: ProgressBarComposition;
  toggle: {
    on: StateType;
    off: StateType;
    selector?: string;
  };
  summaryCard?: string;
  messageCard?: string;
  header: string;
}

interface TextColorComponentType {
  button?: GenericComponentComposition;
  radioButton?: RadioButtonComposition;
  inputField?: InputFieldComposition;
  progressBar?: GenericComponentComposition;
  errorMessage?: GenericComponentComposition;
  toggle?: GenericComponentComposition;
  header?: string;
  messageCard?: string;
}

interface FontsType {
  family: string;
  style: string;
  weight: FontComponentType;
  size?: FontComponentType;
  lineHeight: FontComponentType;
  textTransform: FontComponentType;
  letterSpacing: FontComponentType;
}

interface FontComponentType {
  button?: ButtonComposition;
  radioButton?: RadioButtonComposition;
  inputField?: string;
  progressBar?: string;
  errorMessage?: string;
  header?: string;
}

interface RadioButtonComposition {
  default?: string;
  error?: string;
  primaryText?: string;
  secondaryText?: string;
  valueText?: string;
  valueLabelText?: string;
}

interface ProgressBarComposition {
  container: string;
  bar: string;
  barBackground: string;
}

interface InputFieldComposition {
  inputText: string;
  primaryText: string;
  placeholderText: string;
}

interface ButtonComposition {
  medium: string;
  small: string;
}

interface GenericComponentComposition {
  primary: StateType;
  secondary?: StateType;
  tertiary?: StateType;
  critical?: StateType;
}

interface StateType {
  default: string;
  hover?: string;
  active?: string;
  valid?: string;
  error?: string;
  focusWithin?: string;
  focusVisible?: string;
}
